// c:\Users\WiFi 6 Testing\Desktop\Kallio\web\components\Header.tsx
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-brand-bg/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Left side: Nav for larger screens */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-brand-text hover:text-black">Home</Link>
            <Link href="/catalog" className="text-sm text-brand-text hover:text-black">Catalog</Link>
            <Link href="#" className="text-sm text-brand-text hover:text-black">News</Link>
            <Link href="#" className="text-sm text-brand-text hover:text-black">Location</Link>
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
              <input type="text" placeholder="Search" className="bg-transparent text-sm outline-none placeholder:text-brand-text/70" />
              <Search size={16} className="text-brand-text" />
            </div>
            {/* Mobile Cart Icon */}
            <div className="md:hidden">
                <ShoppingCart className="text-brand-text" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
