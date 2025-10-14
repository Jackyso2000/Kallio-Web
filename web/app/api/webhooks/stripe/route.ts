import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'
import { client } from '@/sanity/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    console.log('Stripe event constructed:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session & {
        payment_intent: Stripe.PaymentIntent
      }

      const paymentIntent = session.payment_intent as Stripe.PaymentIntent
      const shipping = paymentIntent.shipping

      const { userId, cartItems } = session.metadata!
      const totalAmount = session.amount_total! / 100
      console.log('Processing checkout.session.completed event...')

      const order = {
        _type: 'order',
        userId,
        userName: shipping?.name,
        stripePaymentId: session.payment_intent?.toString(),
        totalAmount,
        shippingAddress: [
          shipping?.address?.line1,
          shipping?.address?.line2,
          `${shipping?.address?.city}, ${shipping?.address?.state} ${shipping?.address?.postal_code}`,
          shipping?.address?.country,
        ]
          .filter(Boolean)
          .join('\n'),
        items: JSON.parse(cartItems),
        status: 'Pending',
      }

      console.log('Creating order in Sanity:', order)
      const createdOrder = await client.create(order)
      console.log('Order created successfully in Sanity:', createdOrder._id)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook Error: ${errorMessage}`)
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Stripe Webhook Endpoint' })
}