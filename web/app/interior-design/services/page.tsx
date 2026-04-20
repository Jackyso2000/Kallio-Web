import Layout from '@/components/Layout'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      title: 'Residential Design',
      description: 'We create bespoke living environments tailored to your lifestyle. From single-room updates to full home renovations, our residential design service focuses on balancing aesthetics, comfort, and functionality to build a true sanctuary.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Commercial Spaces',
      description: 'Elevate your brand presence with our commercial interior design. We specialize in boutiques, cafes, and modern workspaces, ensuring the environment reflects your brand identity while optimizing for customer flow and employee wellbeing.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Virtual Styling',
      description: 'Accessible, remote e-design services for those who want professional guidance without the full-service commitment. Receive curated mood boards, 3D floor plans, and shoppable links to execute the vision at your own pace.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-[#f9f9f9] flex flex-col items-center justify-center text-center px-4">
        <span className="text-sm font-bold tracking-widest text-[#680c09] uppercase mb-4">Interior Design</span>
        <h1 className="text-4xl md:text-6xl font-light text-gray-900 uppercase tracking-widest">Our Services</h1>
      </div>

      {/* Services List */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-24 last:mb-0 ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide uppercase">{service.title}</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href="/contact" 
                  className="border border-[#680c09] text-[#680c09] px-8 py-3 rounded-full hover:bg-[#680c09] hover:text-white transition-colors duration-300 uppercase tracking-widest text-sm font-semibold"
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#680c09] py-24 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light mb-6 uppercase tracking-widest">Ready to transform your space?</h2>
          <p className="mb-10 text-white/80 max-w-2xl mx-auto text-lg">Let&apos;s discuss your vision and how Kallio Design can bring it to life.</p>
          <Link href="/contact" className="bg-white text-[#680c09] px-10 py-4 rounded-full font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors">Start a Project</Link>
        </div>
      </div>
    </Layout>
  )
}