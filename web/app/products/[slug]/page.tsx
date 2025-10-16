import Layout from '@/components/Layout'
import ProductView from '@/components/ProductView'
import { client } from '@/sanity/client'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

// This query fetches the product and its approved reviews
const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  images,
  slug,
  price,
  details,
  colors,
  "reviews": *[_type == "review" && product._ref == ^._id && approved == true] {
    _id,
    reviewerName,
    rating,
    comment,
    _createdAt
  } | order(_createdAt desc)
}`

export default async function ProductPage({ params }:{ params: Promise<{ slug: string }> }) {
 
  const product = await client.fetch(PRODUCT_QUERY, { slug: (await params).slug })

  if (!product) {
    notFound() // If no product is found, show a 404 page
  }

  return (
    <Layout>
      <ProductView product={product} />
    </Layout>
  )
}