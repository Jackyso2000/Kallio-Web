import Layout from '@/components/Layout'
import Link from 'next/link'

export default function PortfolioPage() {
  const projects = [
    { title: 'Modern Penthouse', slug: 'modern-penthouse', category: 'Residential', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop' },
    { title: 'Minimalist Cafe', slug: 'minimalist-cafe', category: 'Commercial', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop' },
    { title: 'Urban Loft', slug: 'urban-loft', category: 'Residential', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop' },
    { title: 'Boutique Hotel', slug: 'boutique-hotel', category: 'Commercial', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop' },
    { title: 'Coastal Villa', slug: 'coastal-villa', category: 'Residential', image: 'https://images.unsplash.com/photo-1615874959474-d609969a24d4?q=80&w=800&auto=format&fit=crop' },
    { title: 'Creative Studio', slug: 'creative-studio', category: 'Commercial', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop' },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full bg-white flex flex-col items-center justify-center text-center px-4 border-b border-gray-100">
        <span className="text-sm font-bold tracking-widest text-[#680c09] uppercase mb-4">Interior Design</span>
        <h1 className="text-4xl md:text-6xl font-light text-gray-900 uppercase tracking-widest">Selected Works</h1>
        <p className="text-gray-500 mt-6 max-w-2xl mx-auto">A curated look at spaces we have transformed, driven by purpose and elevated by design.</p>
      </div>

      {/* Portfolio Grid */}
      <div className="bg-[#f9f9f9] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link href={`/interior-design/portfolio/${project.slug}`} key={index} className="group block cursor-pointer">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg mb-4 bg-gray-200">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="border border-white text-white px-6 py-2 rounded-full text-sm uppercase tracking-widest backdrop-blur-sm bg-black/10">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-light text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-[#680c09] tracking-widest uppercase">{project.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Spacer */}
      <div className="bg-white py-16 text-center">
        <p className="text-gray-500 max-w-2xl mx-auto px-4 italic font-light">
          &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
        </p>
      </div>
    </Layout>
  )
}