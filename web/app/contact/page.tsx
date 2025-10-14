import Layout from '@/components/Layout'

export default function ContactPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-4xl font-light mb-8">Contact Us</h1>
          <div className="space-y-6 text-brand-text">
            <p className="text-lg">
              Have a question or want to work together? We’d love to hear from you.
            </p>
            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <a href="mailto:hello@kallio.design" className="hover:text-black">
                hello@kallio.design
              </a>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Address</h2>
              <p>123 Design Lane, Helsinki, Finland</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}