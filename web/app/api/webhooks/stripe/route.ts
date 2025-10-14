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

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      const { userId, cartItems } = session.metadata!
      const shippingDetails = (session as Stripe.Checkout.Session & {
  shipping_details: {
    name: string | null;
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    } | null;
  };
}).shipping_details;

      const totalAmount = session.amount_total! / 100 // Convert from cents

      const order = {
        _type: 'order',
        userId,
        userName: shippingDetails.name,
        stripePaymentId: session.payment_intent as string,
        totalAmount,
        shippingAddress: [
          shippingDetails.address?.line1,
          shippingDetails.address?.line2,
          `${shippingDetails.address?.city}, ${shippingDetails.address?.state} ${shippingDetails.address?.postal_code}`,
          shippingDetails.address?.country,
        ]
          .filter(Boolean)
          .join('\n'),
        items: JSON.parse(cartItems),
        status: 'Pending',
      }

      await client.create(order)
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