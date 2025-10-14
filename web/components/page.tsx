// app/products/[slug]/page.tsx

import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import ProductDisplay from '@/components/ProductDisplay' // this will be our client component
import { notFound } from 'next/navigation'

export interface ProductDetails {
  _id: string
  name: string
  slug: { current: string }
  details: string
  price: number
  images: SanityImage[]
  colors: string[]
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

  return <ProductDisplay product={product} />
}
