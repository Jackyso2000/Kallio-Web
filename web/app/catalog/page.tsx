import Layout from '@/components/Layout'
import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { col } from 'framer-motion/client'

// Re-export this type if it's defined elsewhere
interface Category {
  _id: string
  title: string
  slug: { current: string }
  image: SanityImage
  orderRank: number
}

const builder = imageUrlBuilder(client)

// Define the query to fetch all categories, sorted by the manual orderRank
const CATEGORIES_QUERY = `*[_type == "category"] {
  _id,
  title,
  slug,
  image,
  orderRank
} | order(orderRank asc)`

export default async function CatalogPage() {
  const categories = await client.fetch<Category[]>(
    CATEGORIES_QUERY,
    {},
    { next: { tags: ['category'] } }
  )

  return (
    <Layout>
      <div className="min-h-screen">
        <div style={{ color: '#676767'}} className="container mx-auto px-4 py-32">
          <h1 style={{ color: '#680c09'}}className="text-4xl font-light mb-12 text-center">Our Catalog</h1>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {categories.map((category) => (
              <Link key={category._id} href={`/catalog/${category.slug.current}`} className="group">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                  {category.image && (
                    <Image
                      src={builder.image(category.image).width(400).height(400).url()}
                      alt={category.title}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  )}
                </div>
                <h3 className="mt-4 text-sm text-brand-text">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}