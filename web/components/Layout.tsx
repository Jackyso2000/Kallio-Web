'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from './WhatsAppButton'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster position="top-center" richColors />
      <Footer />
      <WhatsAppButton />
    </>
  )
}