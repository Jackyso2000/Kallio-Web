'use client'

import { ProductDetails } from './types'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import Layout from './Layout'

const builder = imageUrlBuilder(client)

export default function ProductDisplay({ product }: { product: ProductDetails }) {
  const { addToCart } = useCart()

  return (
    <Layout>
      <div className="bg-brand-bg">
        <div className="container mx-auto px-4 py-32">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
                <Image
                  src={builder.image(product.images[0]).width(800).height(800).url()}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={builder.image(image).width(200).height(200).url()}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="pt-4">
              <h1 className="text-3xl font-light text-brand-text">{product.name}</h1>
              <p className="text-2xl mt-2 text-gray-900">${product.price}</p>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Colors</h3>
                <div className="flex items-center space-x-3 mt-2">
                  {product.colors?.map((color) => (
                    <span key={color} className="px-3 py-1 text-sm border rounded-full">{color}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900">Details</h3>
                <p className="mt-2 text-base text-brand-text/80 whitespace-pre-wrap">{product.details}</p>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: builder.image(product.images[0]).width(100).height(100).url(),
                    slug: product.slug.current,
                  })
                }
                className="mt-10 w-full bg-brand-text text-white py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
