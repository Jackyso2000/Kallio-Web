import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import SearchControls from '@/components/SearchControls'
import { client } from '@/sanity/client'
import { Product } from '@/types/product'

const SEARCH_QUERY = `*[_type == "product" && (name match $query || details match $query)] | order(score desc, _createdAt desc) {
  _id,
  name,
  slug,
  price,
  "mainImage": images[0],
  "score": pt::text(description) match $query
}`

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

const CATEGORIES_QUERY = `*[_type == "category"]{
  _id,
  title,
  slug
}`

const SORT_ORDERS: Record<string, string> = {
  'relevance': '_score desc, _createdAt desc',
  'price-asc': 'price asc',
  'price-desc': 'price desc',
  'newest': '_createdAt desc',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string; category?: string }
}) {
  const query = searchParams.q || ''
  const sort = searchParams.sort || 'relevance'
  const categorySlug = searchParams.category || ''
  const order = SORT_ORDERS[sort] || SORT_ORDERS.relevance

  const categoryFilter = categorySlug
    ? `&& references(*[_type=="category" && slug.current == $categorySlug][0]._id)`
    : ''

  const SEARCH_QUERY_WITH_FILTERS = `*[_type == "product" && (name match $query || details match $query) ${categoryFilter}] | order(${order}) {
    _id, name, slug, price, "mainImage": images[0]
  }`

  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(
      SEARCH_QUERY_WITH_FILTERS,
      { query: `${query}*`, categorySlug }, // Use wildcard for partial matching
      {
        next: {
          // Revalidate every 60 seconds
          revalidate: 60,
        },
      },
    ),
    client.fetch<Category[]>(CATEGORIES_QUERY),
  ])

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <SearchControls categories={categories} />
          <h1 className="text-4xl font-light mb-4">
            {products.length > 0
              ? `Search results for "${query}"`
              : `No results for "${query}"`}
          </h1>
          <p className="text-brand-text mb-12">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}