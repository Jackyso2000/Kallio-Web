"use client"

import { Search, ShoppingCart, Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Header() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const { cartCount } = useCart()

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-brand-bg/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Left side: Nav for larger screens */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-brand-text hover:text-black">Home</Link>
            <Link href="/catalog" className="text-sm text-brand-text hover:text-black">Catalog</Link>
            <Link href="/contact" className="text-sm text-brand-text hover:text-black">Contact</Link>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Menu className="text-brand-text" />
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
              {/* Mount the UserButton component */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  )
}
