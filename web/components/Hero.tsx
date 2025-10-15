'use client'

import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { motion } from 'framer-motion'
import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImage) {
  return builder.image(source)
}

interface HeroProps {
  pretitle: string
  title: string
  buttonText: string
  backgroundImage: SanityImage
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}


export default function Hero({ pretitle, title, buttonText, backgroundImage }: HeroProps) {
  return (
    <div className="relative h-screen min-h-[700px] w-full flex items-center justify-center text-white">
      {/* Background Image */}
      <Image
        src={urlFor(backgroundImage).width(1800).quality(90).url()}
        alt="Living room"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Motion Content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p className="mb-2 text-sm" variants={childVariants}>
          {pretitle}
        </motion.p>
        <motion.h1
          className="text-5xl md:text-6xl font-light leading-tight max-w-2xl"
          variants={childVariants}
        >
          {title}
        </motion.h1>
        <motion.button
          className="mt-8 bg-white text-black rounded-full px-8 py-3 text-sm font-semibold hover:bg-opacity-90 transition-all"
          variants={childVariants}
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </div>
  )
}
