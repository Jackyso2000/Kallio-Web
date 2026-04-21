import Layout from '@/components/Layout'
import { client } from '@/sanity/client'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  publishedAt,
  "image": mainImage.asset->url,
  body
}`

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch<any>(POST_QUERY, { slug })

  if (!post) return notFound()

  return (
    <Layout>
      <div className="bg-white pb-24">
        {/* Article Header */}
        <div className="container mx-auto px-4 max-w-4xl pt-16 pb-12">
          <Link href="/interior-design/journal" className="inline-flex items-center text-sm font-bold tracking-widest text-[#680c09] uppercase hover:opacity-70 mb-10 transition-opacity">
            <ArrowLeft size={16} className="mr-2" /> Back to Journal
          </Link>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">{post.title}</h1>
          <span className="text-sm text-gray-500 font-light uppercase tracking-widest">
            Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Hero Image */}
        {post.image && (
          <div className="w-full max-w-6xl mx-auto px-4 mb-16">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#680c09] max-w-none">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}