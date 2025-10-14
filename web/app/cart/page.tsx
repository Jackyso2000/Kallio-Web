'use client'

import { useCart } from '@/contexts/CartContext'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
      })
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout failed:', error)
      setIsLoading(false)
    }
  }
  return (
    <Layout>
      <div className="min-h-screen bg-brand-bg">
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-4xl font-light mb-8">Your Cart</h1>
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-brand-text mb-4">Your cart is empty.</p>
              <Link
                href="/catalog"
                className="bg-brand-text text-white py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ul role="list" className="divide-y divide-brand-text/20">
                  {cart.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-brand-text/20">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-brand-text">
                            <h3>
                              <Link href={`/products/${product.slug}`}>{product.name}</Link>
                            </h3>
                            <p className="ml-4">RM{product.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${product.id}`} className="sr-only">
                              Quantity
                            </label>
                            <input
                              id={`quantity-${product.id}`}
                              name={`quantity-${product.id}`}
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) =>
                                updateQuantity(product.id, parseInt(e.target.value, 10))
                              }
                              className="w-16 rounded-md border border-brand-text/30 bg-transparent py-1.5 text-center text-brand-text focus:border-black focus:ring-black"
                            />
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="font-medium text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="rounded-lg bg-black/5 p-6">
                  <h2 className="text-lg font-medium text-brand-text">Order summary</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-brand-text">Subtotal ({cartCount} items)</p>
                      <p className="text-sm font-medium text-brand-text">RM{cartTotal.toFixed(2)}</p>
                    </div>
                    {/* Add shipping, taxes etc. here */}
                    <div className="flex items-center justify-between border-t border-brand-text/20 pt-4">
                      <p className="text-base font-medium text-brand-text">Order total</p>
                      <p className="text-base font-medium text-brand-text">RM{cartTotal.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-brand-text text-white py-3 px-8 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}