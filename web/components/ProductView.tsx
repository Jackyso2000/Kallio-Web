'use client'

import { useState } from 'react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import { Star } from 'lucide-react'
import type { Image as SanityImage } from 'sanity'
import { useCart } from '@/contexts/CartContext'

const builder = imageUrlBuilder(client)

interface Review {
  _id: string
  reviewerName: string
  rating: number
  comment: string
  _createdAt: string
}

interface Product {
  _id: string
  name: string
  images: SanityImage[]
  slug: { current: string }
  price: number
  details: string
  colors: string[]
  reviews: Review[]
}

interface ProductViewProps {
  product: Product
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

export default function ProductView({ product }: { product: Product }) {
  // State to manage the currently selected large image
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const { addToCart } = useCart()

  const reviews = product.reviews || []
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
            <Image
              src={builder.image(selectedImage).width(800).height(800).url()}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square w-full overflow-hidden rounded-md cursor-pointer ring-2 ${
                  image.asset?._ref === selectedImage.asset?._ref
                    ? 'ring-white-500'
                    : 'ring-transparent hover:ring-white-300'
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={builder.image(image).width(200).height(200).url()}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div style={{ color: '#676767'}}>
          <h1 style={{ color: '#680c09'}} className="text-3xl font-bold tracking-tight text-brand-text">{product.name}</h1>
          <p style={{ color: '#676767'}} className="text-2xl mt-2 text-brand-text/90">RM{product.price.toFixed(2)}</p>

          {/* Average Rating */}
          <div className="mt-4 flex items-center">
            <StarRating rating={averageRating} />
            <span className="ml-2 text-sm text-brand-text/70">
              ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-brand-text">Colors</h3>
              <div style={{ color: 'white'}} className="flex items-center space-x-3 mt-2">
                {product.colors?.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 text-sm border border-brand-text/50 rounded-full"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-brand-text">Details</h3>
            <p className="mt-2 text-base text-brand-text/80">{product.details}</p>
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
              className="mt-10 w-full bg-white text-black py-3 px-8 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
            >
              Add to Cart
            </button>        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ color: '#676767'}} className="mt-16 pt-10 border-t border-brand-text/20">
        <h2 style={{ color: '#680c09'}} className="text-2xl font-bold text-brand-text">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="mt-6 space-y-8">
            {reviews.map((review) => (
              <div key={review._id} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0 text-center sm:text-left">
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-sm text-brand-text/60">{new Date(review._createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <StarRating rating={review.rating} />
                  <p className="mt-2 text-brand-text/90">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-brand-text/70">There are no reviews for this product yet.</p>
        )}
      </div>
    </div>
  )
}