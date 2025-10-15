import Layout from '@/components/Layout'
import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types/product'
import HeroComponent from '@/components/Hero'

interface Hero {
  pretitle: string
  title: string
  buttonText: string
  backgroundImage: SanityImage
}

const HERO_QUERY = `*[_type == "hero" && _id == "hero-homepage"][0]`
const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true]{
  _id, name, slug, price, "mainImage": images[0]
}`
const builder = imageUrlBuilder(client)

export default async function Home() {
  const [hero, featuredProducts] = await Promise.all([
    client.fetch<Hero>(HERO_QUERY),
    client.fetch<Product[]>(FEATURED_PRODUCTS_QUERY),
  ])

  return (
    <Layout>
      <HeroComponent
        pretitle={hero?.pretitle}
        title={hero?.title}
        buttonText={hero?.buttonText}
        backgroundImage={hero?.backgroundImage}
        backgroundImageUrl={hero?.backgroundImage ? builder.image(hero.backgroundImage).url() : ''}
      />

      {/* Featured Products Section */}
      <div className="bg-brand-bg py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}