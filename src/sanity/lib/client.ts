import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

// Create a dummy client config if Sanity is not configured
const isConfigured = projectId && dataset

export const client = createClient({
  projectId: projectId || 'dummy',
  dataset: dataset || 'production',
  apiVersion,
  useCdn,
  perspective: 'published',
})

// Helper to check if Sanity is configured
export const isSanityConfigured = () => isConfigured

