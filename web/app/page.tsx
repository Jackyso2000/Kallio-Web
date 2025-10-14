import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { client } from '@/sanity/client'
import type { Product } from '@/types/product'
import type { Image as SanityImage } from 'sanity'

const HERO_QUERY = `*[_type == "hero" && defined(backgroundImage.asset)][0]`
const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true]{
  _id,
  name,
  slug,
  price,
  "mainImage": images[0]
}`

interface HeroData {
  pretitle: string
  title: string
  buttonText: string
  backgroundImage: SanityImage
}

async function getHeroData() {
  return client.fetch<HeroData>(HERO_QUERY, {}, { next: { tags: ['hero'] } })
}

async function getFeaturedProducts() {
  return client.fetch<Product[]>(FEATURED_PRODUCTS_QUERY, {}, { next: { tags: ['product'] } })
}

export default async function Home() {
  // Fetch data in parallel
  const [heroData, featuredProducts] = await Promise.all([
    getHeroData(),
    getFeaturedProducts(),
  ])

  return (
    <>
      <Header />
      <main>
        {heroData && <Hero {...heroData} />}

        {/* Featured Products Section */}
        {featuredProducts && featuredProducts.length > 0 && (
          <section className="container mx-auto px-4 py-24">
            <h2 className="text-3xl font-light text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Talk About Your Brand Section */}
        <section className="bg-black py-24 text-brand-text">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-light mb-4">
              Designed for Modern Living
            </h2>
            <p className="opacity-80">
              At Kallio, we believe furniture should be as dynamic as the life you live.
              We craft adaptable, modern pieces with timeless appeal, designed for those who appreciate beautiful spaces and the freedom to evolve.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}