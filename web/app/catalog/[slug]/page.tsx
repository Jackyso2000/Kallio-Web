import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { client } from '@/sanity/client'
import type { Product } from '@/types/product'

interface CategoryDetails {
  title: string
  products: Product[]
}

// This query fetches a category by its slug and all products associated with it.
const CATEGORY_PRODUCTS_QUERY = `*[_type == "category" && slug.current == $slug][0]{
  title,
  "products": *[_type == "product" && references(^._id)]{
    _id,
    name,
    slug,
    price,
    "mainImage": images[0]
  }
}`

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await client.fetch<CategoryDetails>(
    CATEGORY_PRODUCTS_QUERY,
    { slug: params.slug },
    { next: { tags: [`category:${params.slug}`] } }
  )

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-4xl font-light mb-8">
            {category.title}
          </h1>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {category.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

