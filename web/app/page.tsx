import Layout from '@/components/Layout'
import { client } from '@/sanity/client'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types/product'
import SplitNavigation from '@/components/SplitNavigation'
import Link from 'next/link'

const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true]{
  _id, name, slug, price, "mainImage": images[0]
}`

export default async function Home() {
  const featuredProducts = await client.fetch<Product[]>(FEATURED_PRODUCTS_QUERY)

  return (
    <Layout>
      <SplitNavigation
        interiorBgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
        furnitureBgImage="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2000&auto=format&fit=crop"
        interiorHref="/interior-design"
        furnitureHref="/catalog"
      />

      {/* Interior Design Services Section */}
      <div className="bg-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 style={{ color: '#680c09'}} className="text-3xl font-light mb-4 uppercase tracking-widest">Our Design Services</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Transforming spaces into personalized sanctuaries. Explore our comprehensive interior design offerings.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Residential Design', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop', desc: 'Full-service design for homes, apartments, and estates.', href: '/interior-design/services' },
              { title: 'Commercial Spaces', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', desc: 'Elevating workspaces, boutiques, and hospitality venues.', href: '/interior-design/services' },
              { title: 'Virtual Styling', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop', desc: 'Accessible e-design services tailored to your remote needs.', href: '/interior-design/services' }
            ].map((service, i) => (
              <Link href={service.href} key={i} className="group relative w-full h-[400px] overflow-hidden rounded-lg block cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-white text-2xl font-light tracking-widest uppercase mb-3 drop-shadow-md">{service.title}</h3>
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-sm transform translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio / Selected Works Peek */}
      <div className="bg-[#f9f9f9] py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Selected Interior Design Work" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <span className="text-sm font-bold tracking-widest text-[#680c09] uppercase mb-2">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">Crafting Environments <br/>With Purpose.</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Every project is a unique collaboration. We blend aesthetics, comfort, and functionality to create spaces that truly reflect the people who live and work in them. Discover our latest transformations.
              </p>
              <Link href="/interior-design/portfolio" className="border-b border-[#680c09] text-[#680c09] pb-1 hover:text-black hover:border-black transition-colors duration-300 uppercase tracking-widest text-sm font-semibold">
                View Selected Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}