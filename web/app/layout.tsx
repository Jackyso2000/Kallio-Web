import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kallio Design',
  description: 'Modern furniture and design.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </CartProvider>
    </ClerkProvider>
  )
}