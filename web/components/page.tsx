// app/products/[slug]/page.tsx

import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import ProductView from '@/components/ProductView' // this will be our client component
import { notFound } from 'next/navigation'

interface Review {
  _id: string
  reviewerName: string
  rating: number
  comment: string
  _createdAt: string
}

export interface ProductDetails {
  _id: string
  name: string
  slug: { current: string }
  details: string
  price: number
  images: SanityImage[]
  colors: string[]
  reviews: Review[]
}

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  details,
  slug,
  price,
  images,
  colors
}`

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await client.fetch<ProductDetails>(PRODUCT_QUERY, { slug: params.slug })

  if (!product) return notFound()

  return <ProductView product={product} />
}
