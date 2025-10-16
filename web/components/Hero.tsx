  'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Image as SanityImage } from 'sanity'
import { Variants } from 'framer-motion';

interface HeroProps {
  pretitle: string
  title: string
  buttonText: string
  backgroundImage: SanityImage
  backgroundImageUrl: string
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}


const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.25, 0.1, 0.25, 1], // or use a valid easing function
      duration: 1,
    },
  },
};
export default function Hero({ pretitle, title, buttonText, backgroundImageUrl }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div ref={containerRef} className="relative h-screen bg-brand-bg text-white overflow-hidden">
      {backgroundImageUrl && (
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src={backgroundImageUrl}
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      )}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.span variants={heroItemVariants} className="text-lg font-light tracking-widest uppercase">{pretitle}</motion.span>
        <motion.h1 variants={heroItemVariants} className="text-5xl md:text-7xl font-light mt-4">{title}</motion.h1>
        <motion.div variants={heroItemVariants}>
          <Link href="/catalog" className="mt-8 inline-block px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
            {buttonText}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}