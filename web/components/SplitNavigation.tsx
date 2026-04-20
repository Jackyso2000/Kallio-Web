'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface SplitNavigationProps {
  interiorBgImage?: string;
  furnitureBgImage?: string;
  interiorHref?: string;
  furnitureHref?: string;
}

export default function SplitNavigation({
  interiorBgImage = '/images/interior-design.jpg',
  furnitureBgImage = '/images/furniture.jpg',
  interiorHref = '/interior-design',
  furnitureHref = '/catalog'
}: SplitNavigationProps) {
  return (
    <div className="flex flex-col md:flex-row h-[85vh] md:h-screen w-full">
      {/* Interior Design Tile */}
      <Link
        href={interiorHref}
        className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden block"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${interiorBgImage}')` }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-6"
          >
            Interior Design
          </motion.h2>
          <span className="text-sm md:text-base border border-white px-8 py-3 rounded-full bg-transparent hover:bg-white hover:text-black transition-colors duration-300">
            Explore Services
          </span>
        </div>
      </Link>

      {/* Furniture Tile */}
      <Link
        href={furnitureHref}
        className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden block"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${furnitureBgImage}')` }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-6"
          >
            Furniture
          </motion.h2>
          <span className="text-sm md:text-base border border-white/50 text-white/90 px-8 py-3 rounded-full bg-black/10 backdrop-blur-sm cursor-not-allowed">
            Coming Soon
          </span>
        </div>
      </Link>
    </div>
  )
}