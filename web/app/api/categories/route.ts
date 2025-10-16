// app/api/categories/route.ts (for App Router)

import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'

export async function GET() {
  const query = `*[_type == "category"] | order(orderRank asc) {
    _id,
    title,
    slug,
    image
  }`

  try {
    const categories = await client.fetch(query)
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
