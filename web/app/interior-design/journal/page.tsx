import Layout from '@/components/Layout'
import Link from 'next/link'
import { client } from '@/sanity/client'

interface PostStub {
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  image: string
}

const JOURNAL_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "image": mainImage.asset->url
}`

export default async function JournalPage() {
  const posts = await client.fetch<PostStub[]>(JOURNAL_QUERY)

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full bg-[#f9f9f9] flex flex-col items-center justify-center text-center px-4 border-b border-gray-200">
        <span className="text-sm font-bold tracking-widest text-[#680c09] uppercase mb-4">Interior Design</span>
        <h1 className="text-4xl md:text-6xl font-light text-gray-900 uppercase tracking-widest">Design Journal</h1>
        <p className="text-gray-500 mt-6 max-w-2xl mx-auto">Insights, trends, and musings on modern interior architecture.</p>
      </div>

      {/* Articles Grid */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, index) => (
              <Link href={`/interior-design/journal/${post.slug}`} key={index} className="group flex flex-col h-full cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md mb-6 bg-gray-100">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 className="text-2xl font-light text-gray-900 mb-3 leading-snug group-hover:text-[#680c09] transition-colors">{post.title}</h3>
                <p className="text-gray-600 font-light flex-grow leading-relaxed line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}