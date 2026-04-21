import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { Buffer } from 'buffer'

// Initialize a client with write permissions
const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Helper function to fetch an image from a URL and upload it to Sanity
async function uploadImageFromUrl(url: string) {
  // Force Unsplash to return a JPEG instead of auto-formatting to WebP
  // Sanity throws "Invalid image" if it receives a WebP file but the filename says .jpg
  const safeUrl = url.replace('auto=format', 'fm=jpg')
  
  const response = await fetch(safeUrl)
  if (!response.ok) {
    throw new Error(`Failed to download image from ${safeUrl}: ${response.statusText}`)
  }
  
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const asset = await writeClient.assets.upload('image', buffer, {
    filename: 'portfolio-image.jpg',
  })
  
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

// Our mock data to insert
const mockProjects = [
  {
    title: 'Modern Penthouse',
    slug: { _type: 'slug', current: 'modern-penthouse' },
    category: 'Residential',
    location: 'Kuala Lumpur, Malaysia',
    year: '2024',
    scope: 'Full Interior Architecture & Furnishing',
    description: 'A complete transformation of a high-rise penthouse into a minimalist sanctuary. We utilized natural light, warm timber textures, and a muted color palette to create an environment that feels both expansive and deeply intimate. Custom joinery and bespoke furniture pieces were designed specifically to fit the curved architecture of the building.',
    heroImageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1500&auto=format&fit=crop',
    galleryUrls: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1500&auto=format&fit=crop',
    ]
  },
  {
    title: 'Minimalist Cafe',
    slug: { _type: 'slug', current: 'minimalist-cafe' },
    category: 'Commercial',
    location: 'Penang, Malaysia',
    year: '2023',
    scope: 'Commercial Interior & Branding',
    description: 'Designed to invoke a sense of calm in the bustling city, this cafe uses raw materials like concrete, steel, and light oak. We focused on optimizing spatial flow for both baristas and patrons.',
    heroImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1500&auto=format&fit=crop',
    galleryUrls: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1500&auto=format&fit=crop'
    ]
  },
  {
    title: 'Urban Loft',
    slug: { _type: 'slug', current: 'urban-loft' },
    category: 'Residential',
    location: 'Singapore',
    year: '2022',
    scope: 'Renovation & Styling',
    description: 'Converting an old industrial space into a warm, inviting residential loft. Emphasizing exposed brickwork while softening the space with plush textiles.',
    heroImageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1500&auto=format&fit=crop',
    galleryUrls: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1500&auto=format&fit=crop'
    ]
  }
]

export async function GET() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing SANITY_API_WRITE_TOKEN in .env.local' }, { status: 500 })
  }

  try {
    const results = []
    for (const project of mockProjects) {
      // 1. Upload images to Sanity
      const heroImage = await uploadImageFromUrl(project.heroImageUrl)
      const images = await Promise.all(project.galleryUrls.map(uploadImageFromUrl))

      // 2. Build the Sanity Document
      const doc = {
        _type: 'portfolio',
        ...project,
        heroImage,
        images,
      }

      // 3. Save to Sanity
      const created = await writeClient.create(doc)
      results.push(created)
    }
    return NextResponse.json({ message: 'Seeding successful! Check your Sanity Studio.', results })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}