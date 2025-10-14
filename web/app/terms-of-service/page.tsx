import Layout from '@/components/Layout'

export default function TermsOfServicePage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-4xl font-light mb-8">Terms of Service</h1>
          <div className="space-y-4 prose prose-lg max-w-none text-brand-text">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-2xl font-light pt-4">1. Terms</h2>
            <p>
              By accessing the website at Kallio Design, you are agreeing to be bound by these terms
              of service, all applicable laws and regulations, and agree that you are responsible
              for compliance with any applicable local laws.
            </p>
            <h2 className="text-2xl font-light pt-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or
              software) on Kallio Design&apos;s website for personal, non-commercial transitory
              viewing only.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}