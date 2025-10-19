import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'
import { CartItem } from '@/contexts/CartContext'
import { auth } from '@clerk/nextjs/server'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
})

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth()
        const cartItems = (await req.json()) as CartItem[]

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
        }

        // The URL to redirect to after a successful payment
        const successUrl = `${req.nextUrl.origin}/checkout/success`
        // The URL to redirect to if the user cancels
        const cancelUrl = `${req.nextUrl.origin}/cart`

        const lineItems = cartItems.map((item) => ({
            price_data: { currency: 'myr', product_data: { name: item.name, images: [item.image] }, unit_amount: item.price * 100 },
            quantity: item.quantity,
        }))

        // Create a Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'fpx', 'grabpay'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            shipping_address_collection: {
                allowed_countries: ['MY', 'SG'], // or ['*'] for all
            },
            metadata: {
                // Add the Clerk User ID to the session metadata
                userId: userId || 'guest',
                // Store cart items as a string to be parsed in the webhook
                cartItems: JSON.stringify(cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price, 
                    //image: item.image 
                }))),
            },

            // 👇 Enable phone number collection
            phone_number_collection: {
                enabled: true,
            },
            expand: ['payment_intent'],

            // 👇 Collect customer name
            customer_creation: 'always', // or 'if_required'
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Error creating Stripe session:', error)
        return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
    }
}