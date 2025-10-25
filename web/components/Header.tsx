'use client'

import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  image: SanityImage
}

const builder = imageUrlBuilder(client)

const CATEGORIES_QUERY = `*[_type == "category"] | order(orderRank asc) {
  _id,
  title,
  slug,
  image
}`

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const { cartCount } = useCart()
  const router = useRouter()
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }

    fetchCategories()
  }, [])


  return (
    <header className="bg-[#680c09] text-white sticky top-0 z-50" onMouseLeave={() => setIsCatalogOpen(false)}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Left side: Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-brand-text hover:text-white">Home</Link>

            <div className="relative" onMouseEnter={() => setIsCatalogOpen(true)}>
              <button className="text-sm text-brand-text hover:text-white flex items-center">
                Catalog
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isCatalogOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isCatalogOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                  >
                    <ul className="py-1 text-gray-800">
                                              <li key={'all'}>
                          <Link
                            href={`/catalog/`}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {'All'}
                          </Link>
                        </li>
                      {categories.map((category) => (
                        <li key={category._id}>
                          <Link
                            href={`/catalog/${category.slug.current}`}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contact" className="text-sm text-brand-text hover:text-white">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden z-50">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="text-brand-text" /> : <Menu className="text-brand-text" />}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-center border-2 border-brand-text px-3 py-1 block">
              <span className="font-bold text-lg tracking-widest text-brand-text">KALLIO</span>
              <span className="text-xs tracking-widest text-brand-text block -mt-1">DESIGN</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center border border-brand-text rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-sm outline-none placeholder:text-brand-text/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
                  }
                }}
              />
              <Search size={16} className="text-brand-text" />
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="text-brand-text" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User actions */}
            <SignedIn>
              <Link href="/account/orders" className="hidden md:block text-sm text-brand-text hover:text-white">
                My Orders
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="text-sm text-brand-text px-4 py-2 border-brand-text/50 transition-colors hover:bg-brand-text hover:text-white cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 z-40 bg-[#680c09]/95 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              <Link href="/" className="text-2xl text-brand-text hover:text-black" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/catalog" className="text-2xl text-brand-text hover:text-black" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
              <Link href="/contact" className="text-2xl text-brand-text hover:text-black" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
