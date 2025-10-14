// kallio-design/web/sanity/client.ts
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "your-project-id"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const apiVersion = '2023-05-03'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // set to `false` for fresh data
})
