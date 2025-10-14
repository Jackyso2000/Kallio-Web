import type { Image as SanityImage } from 'sanity'

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  mainImage: SanityImage
}