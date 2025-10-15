"use client"

import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Header() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Left side: Nav for larger screens */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-brand-text hover:text-white">Home</Link>
            <Link href="/catalog" className="text-sm text-brand-text hover:text-white">Catalog</Link>
            <Link href="/contact" className="text-sm text-brand-text hover:text-white">Contact</Link>
          </nav>

          {/* Mobile Menu Icon */}
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

          {/* Right side: Icons and Search */}
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
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="text-brand-text" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <SignedIn>
              <Link href="/account/orders" className="hidden md:block text-sm text-brand-text hover:text-white">
                My Orders
              </Link>
              {/* Mount the UserButton component */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="[&>button]:text-sm [&>button]:text-brand-text [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-full [&>button]:border [&>button]:border-brand-text/50 [&>button]:transition-colors [&>button]:hover:bg-brand-text [&>button]:hover:text-white">
                <SignInButton />
              </div>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 z-40 bg-brand-bg/95 backdrop-blur-lg flex flex-col items-center justify-center"
          >
          <nav className="flex flex-col items-center gap-8">
            <Link href="/" className="text-2xl text-brand-text hover:text-black" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/catalog" className="text-2xl text-brand-text hover:text-black" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
            <Link href="/contact" className="text-2xl text-brand-text hover:text-black" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
