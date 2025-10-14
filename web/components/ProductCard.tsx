import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import type { Product } from '@/types/product'

const builder = imageUrlBuilder(client)

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug.current}`} className="group">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-brand-bg">
        <Image
          src={builder.image(product.mainImage).width(400).height(400).url()}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-brand-text">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-black">${product.price}</p>
    </Link>
  )
}