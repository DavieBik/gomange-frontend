import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'v0ejlvd9',         // ✅ Your actual project ID
  dataset: 'production',         // ✅ Your dataset
  useCdn: true,
  apiVersion: '2023-01-01'       // ✅ Or today's date
})

export default client

