'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Mock data - eventually, you'll fetch this from Sanity using the `params.slug`
  const project = {
    title: 'Modern Penthouse',
    category: 'Residential',
    location: 'Kuala Lumpur, Malaysia',
    year: '2024',
    scope: 'Full Interior Architecture & Furnishing',
    description: 'A complete transformation of a high-rise penthouse into a minimalist sanctuary. We utilized natural light, warm timber textures, and a muted color palette to create an environment that feels both expansive and deeply intimate. Custom joinery and bespoke furniture pieces were designed specifically to fit the curved architecture of the building.',
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1500&auto=format&fit=crop',
    ]
  }

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <Layout>
      {/* Hero Cover */}
      <div className="relative h-[70vh] md:h-[85vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 p-6 md:p-16 w-full flex flex-col md:flex-row md:items-end justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-bold tracking-widest text-white/80 uppercase mb-4 block">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-light text-white uppercase tracking-widest drop-shadow-md">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Sticky Layout: Details on Left, Scrolling Gallery on Right */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row container mx-auto">
          
          {/* Left Column: Project Details (Sticky) */}
          <div className="w-full md:w-1/3 p-8 md:p-16 md:sticky md:top-24 h-fit">
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-[#680c09] uppercase mb-2">Location</h3>
                <p className="text-gray-600 font-light">{project.location}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-[#680c09] uppercase mb-2">Year</h3>
                <p className="text-gray-600 font-light">{project.year}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-[#680c09] uppercase mb-2">Scope</h3>
                <p className="text-gray-600 font-light">{project.scope}</p>
              </div>
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-xs font-bold tracking-widest text-[#680c09] uppercase mb-4">The Story</h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Image Stack */}
          <div className="w-full md:w-2/3 p-4 md:p-8 md:py-16 flex flex-col gap-6 md:gap-10 bg-[#f9f9f9]">
            {project.images.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full group cursor-pointer overflow-hidden rounded-lg shadow-sm"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-[1.03]"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Next Project Footer */}
      <Link href="/interior-design/portfolio" className="block group">
        <div className="bg-[#680c09] py-24 text-center text-white transition-colors duration-500 group-hover:bg-[#4a0907]">
          <span className="text-sm font-bold tracking-widest text-white/50 uppercase mb-4 block">Back to</span>
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest flex items-center justify-center gap-4">
            View All Projects
            <span className="transform transition-transform duration-300 group-hover:translate-x-4">→</span>
          </h2>
        </div>
      </Link>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={36} strokeWidth={1} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={selectedImage} 
              alt="Fullscreen View"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}