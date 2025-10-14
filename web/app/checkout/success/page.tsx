'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useCart } from '@/contexts/CartContext'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <Layout>
      <div className="min-h-screen bg-brand-bg">
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-light mb-4">Thank You!</h1>
          <p className="text-lg text-brand-text mb-8">Your order has been placed successfully.</p>
          <Link
            href="/catalog"
            className="bg-brand-text text-white py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Layout>
  )
}