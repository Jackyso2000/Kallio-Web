import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { Buffer } from 'buffer'

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function uploadImageFromUrl(url: string) {
  const safeUrl = url.replace('auto=format', 'fm=jpg')
  const response = await fetch(safeUrl)
  if (!response.ok) throw new Error(`Failed to fetch ${safeUrl}`)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const asset = await writeClient.assets.upload('image', buffer, { filename: 'blog-image.jpg' })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

function generateBody(text: string) {
  return [
    {
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', marks: [], text }],
    },
  ]
}

const mockPosts = [
  {
    title: 'The Art of Minimalist Living',
    slug: { _type: 'slug', current: 'art-of-minimalist-living' },
    excerpt: 'Minimalism is more than just bare walls. It is about creating space for what truly matters.',
    bodyText: 'Minimalism in interior design is often misunderstood as cold or sterile. In reality, when executed thoughtfully, it creates an environment of profound warmth and intention. By stripping away the superfluous, we allow the essential elements—light, form, and material—to speak. At Kallio Design, our minimalist approach focuses on rich textures, tactile surfaces, and functional beauty, proving that less truly can be more.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'Choosing the Right Timber',
    slug: { _type: 'slug', current: 'choosing-the-right-timber' },
    excerpt: 'Wood breathes life into a space. Here is how to select the perfect grain and tone.',
    bodyText: 'Timber is arguably the most versatile material in the architect’s toolkit. From the blonde, airy notes of Scandinavian ash to the deep, resonant warmth of walnut, wood anchors a room. When designing custom furniture, understanding the moisture content, grain direction, and finishing oils is paramount to ensuring longevity and aesthetic grace.',
    imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'Lighting as Architecture',
    slug: { _type: 'slug', current: 'lighting-as-architecture' },
    excerpt: 'Lighting should never be an afterthought. It is the fourth dimension of your interior.',
    bodyText: 'A beautifully designed room can fall flat under poor lighting. We approach lighting as a structural element. Layering ambient, task, and accent lighting allows a space to transition seamlessly from day to night. Concealed LED strips washing over a textured stone wall can create drama, while a low-hanging pendant over a dining table creates intimacy.',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'Wabi-Sabi: Finding Beauty in Imperfection',
    slug: { _type: 'slug', current: 'wabi-sabi-imperfection' },
    excerpt: 'Embracing the natural life cycle of materials in modern design.',
    bodyText: 'The Japanese philosophy of Wabi-Sabi celebrates the beauty of things imperfect, impermanent, and incomplete. In our interiors, this translates to unlacquered brass that patinas over time, hand-thrown ceramics, and linens with natural wrinkles. It is a rebellion against the synthetic, favoring environments that age gracefully with their inhabitants.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'The Psychology of Color in Interiors',
    slug: { _type: 'slug', current: 'psychology-of-color' },
    excerpt: 'How your wall color affects your mood, productivity, and sleep.',
    bodyText: 'Color is a silent language. Deep, desaturated greens evoke the restorative calm of a forest, making them ideal for studies and libraries. Warm terracotta tones stimulate conversation and appetite in dining areas. At Kallio Design, we curate color palettes that resonate on a subconscious level, ensuring your home supports your emotional well-being.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'Bespoke vs. Mass-Produced',
    slug: { _type: 'slug', current: 'bespoke-vs-mass-produced' },
    excerpt: 'Why investing in custom furniture transforms your living experience.',
    bodyText: 'While off-the-shelf furniture offers immediate gratification, bespoke pieces offer narrative. A custom dining table isn’t just a surface; it’s an heirloom engineered specifically for the dimensions of your room and the habits of your family. The craftsmanship, joinery, and material selection in bespoke pieces elevate them from mere objects to art.',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'Sustainable Design Practices',
    slug: { _type: 'slug', current: 'sustainable-design-practices' },
    excerpt: 'Designing for the future means sourcing responsibly today.',
    bodyText: 'Sustainability is no longer a trend; it is an obligation. We prioritize sourcing FSC-certified timber, utilizing low-VOC finishes, and working with local artisans to reduce our carbon footprint. True sustainable design also means creating timeless spaces that transcend fleeting trends, ensuring they won’t end up in a landfill in a decade.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'Maximizing Small Spaces',
    slug: { _type: 'slug', current: 'maximizing-small-spaces' },
    excerpt: 'Intelligent spatial planning for urban apartments.',
    bodyText: 'Small spaces require militant spatial discipline. The secret lies in multi-functional joinery and visual continuity. By extending cabinetry to the ceiling, utilizing hidden storage, and maintaining a cohesive material palette, we can make a compact urban loft feel expansive, airy, and entirely uncompromised.',
    imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'The Power of Texture',
    slug: { _type: 'slug', current: 'the-power-of-texture' },
    excerpt: 'When color is minimal, texture becomes the star of the show.',
    bodyText: 'In monochromatic interiors, texture does the heavy lifting. A room painted entirely in white can feel flat, but add bouclé upholstery, a heavily heavily veined travertine coffee table, and a limewashed wall, and suddenly the room is dynamic. Texture invites touch, grounding us in the physical world.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1500&fm=jpg&fit=crop',
  },
  {
    title: 'The Future of Workspaces',
    slug: { _type: 'slug', current: 'future-of-workspaces' },
    excerpt: 'Bridging the gap between residential comfort and commercial utility.',
    bodyText: 'The modern office has evolved. Fluorescent lights and sterile cubicles have been replaced by environments that mimic the comfort of home. By integrating residential materials—soft seating, ambient lighting, and abundant greenery—we design commercial spaces that foster creativity, collaboration, and employee retention.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1500&fm=jpg&fit=crop',
  }
]

export async function GET() {
  if (!process.env.SANITY_API_WRITE_TOKEN) return NextResponse.json({ error: 'Missing Token' }, { status: 500 })

  try {
    const results = []
    for (const post of mockPosts) {
      const mainImage = await uploadImageFromUrl(post.imageUrl)
      const doc = { _type: 'post', title: post.title, slug: post.slug, excerpt: post.excerpt, body: generateBody(post.bodyText), mainImage }
      const created = await writeClient.create(doc)
      results.push(created)
    }
    return NextResponse.json({ message: '10 Blog Posts Seeded Successfully!', results })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}