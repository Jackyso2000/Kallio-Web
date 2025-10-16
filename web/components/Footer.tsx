import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#680c09]/95">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} Kallio Design. All Rights Reserved.
          </p>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm text-white hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm text-white hover:text-white">Terms of Service</Link>
            <Link href="/contact" className="text-sm text-white hover:text-white">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}