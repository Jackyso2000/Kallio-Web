import Layout from '@/components/Layout'
import OrderList from '@/components/OrderList'
import { client } from '@/sanity/client'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface OrderItem {
  name: string
  productId: string
  hasBeenReviewed: boolean
  quantity: number
  price: number
  image?: string
}

interface Order {
  _id: string
  _createdAt: string
  totalAmount: number
  stripePaymentId: string
  status: string
  items: OrderItem[]
  userName: string
  shippingAddress: string
}

const ORDERS_QUERY = `*[_type == "order" && userId == $userId] | order(_createdAt desc) {
  _id,
  _createdAt,
  totalAmount,
  stripePaymentId,
  status,
  userName,
  shippingAddress,
  "items": items[]{ name, quantity, price, id, image}

}`

export default async function OrdersPage() {
  const { userId } = await auth()

  if (!userId) {
    // This should be handled by middleware, but as a fallback
    redirect('/sign-in')
  }

  const orders = await client.fetch<Order[]>(ORDERS_QUERY, { userId })
  console.log(orders)
  return (
    <Layout>
      <div className="min-h-screen bg-brand-bg">
        <div className="container mx-auto px-4 py-32">
          <h1 style={{ color: '#680c09'}} className="text-4xl font-light mb-8">My Orders</h1>
          {orders.length === 0 ? (
            <p style={{ color: '#680c09'}} className="text-brand-text">You have not placed any orders yet.</p>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </Layout>
  )
}