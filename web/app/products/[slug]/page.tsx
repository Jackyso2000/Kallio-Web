import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Header from '@/components/Header'

interface ProductDetails {
  _id: string
  name: string
  details: string
  price: number
  images: SanityImage[]
  colors: string[]
}

// This function tells Next.js which product pages to pre-build
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(`*[_type == "product" && defined(slug.current)][].slug.current`)
  return slugs.map((slug) => ({ slug }))
}

const builder = imageUrlBuilder(client)

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  details,
  price,
  images,
  colors
}`

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await client.fetch<ProductDetails>(
    PRODUCT_QUERY,
    { slug: params.slug },
    { next: { tags: [`product:${params.slug}`] } }
  )

  if (!product) {
    // In a real app, you'd want a proper 404 page here
    return <div>Product not found</div>
  }

  return (
    <>
      <Header />
      <main className="bg-brand-bg">
        <div className="container mx-auto px-4 py-32">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-brand-bg mb-4">
                <Image
                  src={builder.image(product.images[0]).width(800).height(800).url()}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="aspect-square w-full overflow-hidden rounded-lg bg-brand-bg">
                    <Image
                      src={builder.image(image).width(200).height(200).url()}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="pt-4">
              <h1 className="text-3xl font-light text-brand-text">{product.name}</h1>
              <p className="text-2xl mt-2 text-black">${product.price}</p>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-black">Colors</h3>
                <div className="flex items-center space-x-3 mt-2">
                  {product.colors?.map((color) => (
                    <span key={color} className="px-3 py-1 text-sm border border-brand-text/50 rounded-full">{color}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-black">Details</h3>
                <p className="mt-2 text-base text-brand-text/80 whitespace-pre-wrap">{product.details}</p>
              </div>

              <button className="mt-10 w-full bg-brand-text text-white py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
