import { client } from '@/sanity/client'
import { notFound } from 'next/navigation'
import PortfolioView, { type PortfolioProject } from '@/components/PortfolioView'

const PROJECT_QUERY = `*[_type == "portfolio" && slug.current == $slug][0]{
  title,
  category,
  location,
  year,
  scope,
  description,
  "heroImage": heroImage.asset->url,
  "images": images[].asset->url
}`

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15 requires awaiting the params object
  const { slug } = await params

  // Fetch the project data from Sanity
  const project = await client.fetch<PortfolioProject>(PROJECT_QUERY, { slug })

  // If no project is found, show a 404 page
  if (!project) return notFound()

  return <PortfolioView project={project} />
}