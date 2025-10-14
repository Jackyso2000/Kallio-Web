import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from './WhatsAppButton'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}