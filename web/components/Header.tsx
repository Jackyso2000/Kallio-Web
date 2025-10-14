// kallio-design/web/components/Header.tsx
import { Search, ShoppingCart, User, Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-[#F1ECE8]/90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Left side: Nav for larger screens */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-[#654534] hover:text-black">Home</a>
            <a href="#" className="text-sm text-[#654534] hover:text-black">Catalog</a>
            <a href="#" className="text-sm text-[#654534] hover:text-black">News</a>
            <a href="#" className="text-sm text-[#654534] hover:text-black">Location</a>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Menu className="text-[#654534]" />
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="text-center border-2 border-[#654534] px-3 py-1">
              <span className="font-bold text-lg tracking-widest text-[#654534]">KALLIO</span>
              <span className="text-xs tracking-widest text-[#654534]">DESIGN</span>
            </div>
          </div>

          {/* Right side: Icons and Search */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center border border-gray-400 rounded-full px-3 py-1">
              <input type="text" placeholder="Search" className="bg-transparent text-sm outline-none" />
              <Search size={16} className="text-gray-500" />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="flex items-center gap-1 text-sm text-[#654534] hover:text-black">
                <User size={18} /> Login
              </a>
              <a href="#" className="flex items-center gap-1 text-sm text-[#654534] hover:text-black">
                <ShoppingCart size={18} /> Cart
              </a>
            </div>
            {/* Mobile Cart Icon */}
            <div className="md:hidden">
                <ShoppingCart className="text-[#654534]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
