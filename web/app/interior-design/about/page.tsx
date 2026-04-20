import Layout from '@/components/Layout'

export default function AboutPage() {
  const team = [
    { name: 'Elena Kallio', role: 'Principal Designer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop' },
    { name: 'Marcus Chen', role: 'Lead Architect', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop' },
    { name: 'Sarah Jenkins', role: 'Interior Stylist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <span className="text-sm font-bold tracking-widest text-white/80 uppercase mb-4">Interior Design</span>
          <h1 className="text-4xl md:text-6xl font-light text-white uppercase tracking-widest drop-shadow-md">About Us</h1>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 uppercase tracking-widest">Our Philosophy</h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
            <p>
              At Kallio Design, we believe that the spaces we inhabit shape our daily lives, influencing our mood, productivity, and peace of mind. Founded on the principles of purposeful minimalism and functional elegance, we strive to create environments that are not only visually stunning but intuitively livable.
            </p>
            <p>
              What began as a small boutique studio has evolved into a full-service interior design and custom furniture destination. Whether we are reimagining a historic loft or outfitting a modern commercial workspace, our approach remains the same: a deep collaboration with our clients to unearth the true potential of their space.
            </p>
            <p>
              Every texture chosen, every line drawn, and every piece of furniture placed is a deliberate choice aimed at crafting a cohesive narrative. Welcome to Kallio Design—where form meets profound function.
            </p>
          </div>
        </div>
      </div>

      {/* The Team */}
      <div className="bg-[#f9f9f9] py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 uppercase tracking-widest">Meet The Team</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">The creative minds dedicated to bringing your vision to life.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-[#680c09] uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}