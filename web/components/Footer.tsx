import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-brand-text/70">
            &copy; {new Date().getFullYear()} Kallio Design. All Rights Reserved.
          </p>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-brand-text hover:text-black">Privacy Policy</Link>
            <Link href="#" className="text-sm text-brand-text hover:text-black">Terms of Service</Link>
            <Link href="#" className="text-sm text-brand-text hover:text-black">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}