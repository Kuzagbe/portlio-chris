import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

// Get config - ensure we have valid values
// In browser, try to get from import.meta.env directly as fallback
function getClientConfig() {
  let finalProjectId = projectId;
  let finalDataset = dataset;
  let finalApiVersion = apiVersion;

  // In browser context, try to read directly from import.meta.env as fallback
  if (typeof window !== 'undefined') {
    try {
      // @ts-ignore - import.meta exists in ESM/Vite
      if (import.meta && import.meta.env) {
        // @ts-ignore
        if (!finalProjectId && import.meta.env.VITE_SANITY_PROJECT_ID) {
          // @ts-ignore
          finalProjectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        }
        // @ts-ignore
        if (!finalDataset && import.meta.env.VITE_SANITY_DATASET) {
          // @ts-ignore
          finalDataset = import.meta.env.VITE_SANITY_DATASET;
        }
        // @ts-ignore
        if (!finalApiVersion && import.meta.env.VITE_SANITY_API_VERSION) {
          // @ts-ignore
          finalApiVersion = import.meta.env.VITE_SANITY_API_VERSION;
        }
      }
    } catch (e) {
      // Silently fail
    }
  }

  return {
    projectId: finalProjectId || 'dllxpw15',
    dataset: finalDataset || 'production',
    apiVersion: finalApiVersion || '2024-02-02',
  };
}

const config = getClientConfig();
const isConfigured = !!(config.projectId && config.dataset)

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

