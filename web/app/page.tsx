import Layout from '@/components/Layout'
import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types/product'

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
      {/* Hero Section */}
      <div className="relative h-screen bg-brand-bg text-white">
        {hero?.backgroundImage && (
          <Image
            src={builder.image(hero.backgroundImage).url()}
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            priority
          />
        )}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span className="text-lg font-light tracking-widest uppercase">{hero?.pretitle}</span>
          <h1 className="text-5xl md:text-7xl font-light mt-4">{hero?.title}</h1>
          <Link href="/catalog" className="mt-8 px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
            {hero?.buttonText}
          </Link>
        </div>
      </div>

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