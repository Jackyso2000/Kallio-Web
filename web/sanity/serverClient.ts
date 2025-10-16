import { createClient } from 'next-sanity'

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-05-08',
  token: process.env.SANITY_API_TOKEN, // ✅ token with write access
  useCdn: false,
})
