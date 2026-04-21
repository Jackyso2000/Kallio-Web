import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { client } from '@/sanity/client'
import { v4 as uuidv4 } from 'uuid'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// ✅ Custom type that includes `shipping`
type CheckoutSessionWithShipping = Stripe.Checkout.Session & {
  shipping?: {
    name?: string
    address?: {
      line1?: string
      line2?: string
      city?: string
      state?: string
      postal_code?: string
      country?: string
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    console.log('✅ Stripe event constructed:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as CheckoutSessionWithShipping

      const customerName =
        session.shipping?.name || session.customer_details?.name || 'Unknown'
const email = session.customer_details?.email || ''
const phone = session.customer_details?.phone || ''

      const shippingAddress = session.shipping?.address

      console.log('Customer Name:', customerName)
      console.log('Shipping Address:', shippingAddress)

      const formattedAddress = shippingAddress
        ? [
            shippingAddress.line1,
            shippingAddress.line2,
            [
              shippingAddress.city,
              shippingAddress.state,
              shippingAddress.postal_code,
            ]
              .filter(Boolean)
              .join(' '),
            shippingAddress.country,
          ]
            .filter(Boolean)
            .join('\n')
        : 'No address provided'

      const { userId, cartItems } = session.metadata ?? {}
      const totalAmount = (session.amount_total ?? 0) / 100

      if (!userId || !cartItems) {
        console.error('❌ Missing userId or cartItems in metadata')
        return NextResponse.json({ received: true })
      }

      const parsedCartItems = JSON.parse(cartItems) as {
        product: string
        quantity: number
        price: number
      }[]

      const slugs = parsedCartItems.map((item) => item.product)
      const sanityProducts = await client.fetch<
        Array<{ _id: string; slug: { current: string } }>
      >(
        `*[_type == "product" && slug.current in $slugs]{ _id, slug }`,
        { slugs }
      )

      const items = parsedCartItems
        .map((item) => {
          const productId = item.product
          if (!productId) {
            console.error(`❌ No Sanity product found for slug "${item.product}"`)
            return null
          }

          return {
            _key: uuidv4(),
            product: {
              _type: 'reference',
              _ref: productId,
            },
            quantity: item.quantity,
            price: item.price,
          }
        })
        .filter(Boolean)

      const order = {
        _type: 'order',
        userId,
        userName: customerName,
        email,
        phone,
        stripePaymentId: session.payment_intent?.toString() ?? '',
        totalAmount,
        shippingAddress: formattedAddress,
        items,
        status: 'Pending',
      }

      console.log('🧾 Creating order in Sanity:', order)
      const createdOrder = await client.create(order)
      console.log('✅ Order created successfully:', createdOrder._id)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`❌ Webhook Error: ${errorMessage}`)
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Stripe Webhook Endpoint' })
}
