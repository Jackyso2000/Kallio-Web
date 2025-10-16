import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import ProductGrid from '@/components/ProductGrid'
import Hero from '@/components/Hero'
import { client } from '@/sanity/client'
import type { Product } from '@/types/product'
import imageUrlBuilder from '@sanity/image-url'

interface CategoryDetails {
  title: string
  products: Product[]
}
interface HeroData {
  pretitle: string
  title: string
  buttonText: string
  backgroundImage: any
}

// This query fetches a category by its slug and all products associated with it.
const PAGE_QUERY = `{
  "hero": *[_type == "hero"][0],
  "category": *[_type == "category" && slug.current == $slug][0]{
  title,
  "products": *[_type == "product" && references(^._id)]{
    _id,
    name,
    slug,
    price,
    "mainImage": images[0]
  }
}
}`

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Assuming 'featured' is the slug for your main page category
  const { hero, category } = await client.fetch<{ hero: HeroData; category: CategoryDetails }>(
    PAGE_QUERY,
    { slug: params.slug },
    { next: { tags: [`category:${params.slug}`] } }
  )

  if (!hero && !category) {
    return <div>Page data not found</div>
  }
const builder = imageUrlBuilder(client)

  return (
    <>
      <Header />
      {hero && (
        <Hero pretitle={hero.pretitle} title={hero.title} buttonText={hero.buttonText} backgroundImage={hero.backgroundImage} backgroundImageUrl={builder.image(hero.backgroundImage).url()}/>
      )}
      <main className="min-h-screen">
        {category && <div className="container mx-auto px-4 py-32">
          <h1 style={{ color: '#680c09'}} className="text-4xl font-light mb-8">
            {category.title}
          </h1>
          <ProductGrid products={category.products} />
        </div>}
      </main>
    </>
  )
}