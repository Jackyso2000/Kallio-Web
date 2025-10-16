import Layout from '@/components/Layout'
import ProductView from '@/components/ProductView'
import { client } from '@/sanity/client'
import { notFound } from 'next/navigation'

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

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await client.fetch(PRODUCT_QUERY, { slug: params.slug })

  if (!product) {
    notFound()
  }

  return (
    <Layout>
      <ProductView product={product} />
    </Layout>
  )
}
