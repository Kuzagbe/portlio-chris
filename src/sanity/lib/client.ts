import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

// Get config - ensure we have valid values
// In browser, try to get from import.meta.env directly as fallback
function getClientConfig() {
  let finalProjectId = projectId;
  let finalDataset = dataset;
  let finalApiVersion = apiVersion;

  // Note: import.meta.env is available in Vite/browser context
  // But we rely on process.env (via dotenv) which works in both contexts
  // This avoids CJS build issues during Sanity Studio deployment

  return {
    projectId: finalProjectId || 'dllxpw15',
    dataset: finalDataset || 'production',
    apiVersion: finalApiVersion || '2024-02-02',
  };
}

const config = getClientConfig();
const isConfigured = !!(config.projectId && config.dataset)

// Debug logging in browser
if (typeof window !== 'undefined') {
  console.log('🔧 Sanity Client Config:', {
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    isConfigured,
  });
}

export const client = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  useCdn,
  perspective: 'published',
})

// Helper to check if Sanity is configured
export const isSanityConfigured = () => {
  return isConfigured
}

