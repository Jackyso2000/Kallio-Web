import Layout from '@/components/Layout'

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-4xl font-light mb-8">Privacy Policy</h1>
          <div className="space-y-4 prose prose-lg max-w-none text-brand-text">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Kallio Design ("us", "we", or "our") operates the Kallio Design website (the "Service").
              This page informs you of our policies regarding the collection, use, and disclosure of
              personal data when you use our Service and the choices you have associated with that
              data.
            </p>
            <h2 className="text-2xl font-light pt-4">Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and
              improve our Service to you.
            </p>
            <h2 className="text-2xl font-light pt-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}