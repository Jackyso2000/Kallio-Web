import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'
import { client } from '@/sanity/client'
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    console.log('✅ Stripe event constructed:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session & {
        payment_intent: Stripe.PaymentIntent
      }

      const paymentIntent = session.payment_intent as Stripe.PaymentIntent
      const shipping = paymentIntent.shipping
      const { userId, cartItems } = session.metadata!
      const totalAmount = session.amount_total! / 100

      const parsedCartItems = JSON.parse(cartItems) as {
        product: string // slug
        quantity: number
        price: number
      }[]

      // ✅ Fetch product IDs by slug
      const slugs = parsedCartItems.map((item) => item.product)
      const sanityProducts = await client.fetch<
        Array<{ _id: string; slug: { current: string } }>
      >(
        `*[_type == "product" && slug.current in $slugs]{ _id, slug }`,
        { slugs }
      )

      const slugToIdMap = sanityProducts.reduce((acc, product) => {
        acc[product.slug.current] = product._id
        return acc
      }, {} as Record<string, string>)

      console.log('🧩 Slug to ID map:', slugToIdMap)

      const items = parsedCartItems
        .map((item) => {
          const productRef = slugToIdMap[item.product]

          if (!productRef) {
            console.error(`❌ No product found in Sanity for slug "${item.product}". Skipping item.`)
            return null // Skip if no product found
          }

          return {
            _key: uuidv4(),  // Unique key for Sanity list items
            product: {
              _type: 'reference',
              _ref: productRef,  // <-- Use the actual product ID here
            },
            quantity: item.quantity,
            price: item.price,
          }
        })
        .filter(Boolean)


      console.log('🛒 Final items array to be sent to Sanity:', items)

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
