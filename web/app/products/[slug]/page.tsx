import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import Layout from '@/components/Layout'
import ProductView from '@/components/ProductView'
import { notFound } from 'next/navigation'

interface ProductDetails {
  _id: string
  name: string
  details: string
  slug: { current: string }
  price: number
  images: SanityImage[]
  colors: string[]
}

// This function tells Next.js which product pages to pre-build
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "product" && defined(slug.current)][].slug.current`
  )
  return slugs.map((slug) => ({ slug }))
}

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  details,
  price,
  images,
  colors
}`

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = await client.fetch<ProductDetails>(PRODUCT_QUERY, { slug }, { next: { tags: [`product:${slug}`] } })

  if (!product) {
    notFound()
  }

  return (
    <Layout>
      <ProductView product={product} />
    </Layout>
  )
}
