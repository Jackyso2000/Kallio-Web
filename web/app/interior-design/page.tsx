import Layout from '@/components/Layout'
import Link from 'next/link'

export default function InteriorDesignLandingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <span className="text-sm font-bold tracking-widest text-white/80 uppercase mb-4">Kallio Design</span>
          <h1 className="text-5xl md:text-7xl font-light text-white uppercase tracking-widest drop-shadow-md mb-8">Interior Architecture <br /> & Design</h1>
          <Link href="/interior-design/portfolio" className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm font-semibold">
            Explore Portfolio
          </Link>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-white py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-sm font-bold tracking-widest text-[#680c09] uppercase mb-4 block">Our Approach</span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 leading-relaxed">
            We believe in creating spaces that are not only beautiful but also deeply personal and functional.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            From concept to completion, our studio works closely with clients to craft environments that reflect their unique lifestyle and aesthetic. Whether it&apos;s a residential haven or a dynamic commercial space, we bring a meticulous attention to detail and a passion for timeless design to every project.
          </p>
          <Link href="/interior-design/about" className="border-b border-[#680c09] text-[#680c09] pb-1 hover:text-black hover:border-black transition-colors duration-300 uppercase tracking-widest text-sm font-semibold">
            Discover Our Story
          </Link>
        </div>
      </div>

      {/* Services Teaser */}
      <div className="bg-[#f9f9f9] py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest text-[#680c09] uppercase mb-4 block">Expertise</span>
            <h2 className="text-3xl font-light text-gray-900 uppercase tracking-widest">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Residential', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop' },
              { title: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
              { title: 'Virtual Styling', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop' }
            ].map((service, i) => (
              <Link href="/interior-design/services" key={i} className="group relative w-full h-[300px] overflow-hidden rounded-lg block cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                  <h3 className="text-white text-2xl font-light tracking-widest uppercase drop-shadow-md">{service.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/interior-design/services" className="inline-block border border-[#680c09] text-[#680c09] px-8 py-3 rounded-full hover:bg-[#680c09] hover:text-white transition-colors duration-300 uppercase tracking-widest text-sm font-semibold">
              View All Services
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Call to Action */}
      <div className="bg-[#680c09] py-24 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light mb-6 uppercase tracking-widest">Start Your Project</h2>
          <p className="mb-10 text-white/80 max-w-2xl mx-auto text-lg">We are currently accepting new projects for the upcoming season. Let&apos;s create something extraordinary together.</p>
          <Link href="/contact" className="bg-white text-[#680c09] px-10 py-4 rounded-full font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors">Contact Us</Link>
        </div>
      </div>
    </Layout>
  )
}