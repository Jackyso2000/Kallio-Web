import Layout from '@/components/Layout'

export default function Loading() {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-light mb-4">Loading...</h1>
          <p className="text-brand-text">Please wait while we find your products.</p>
        </div>
      </div>
    </Layout>
  )
}