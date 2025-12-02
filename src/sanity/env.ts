// Support both Vite (browser) and Node.js (Sanity CLI/config) environments
const getEnv = (key: string, fallback?: string): string | undefined => {
  // Check if we're in a Vite/browser environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback;
  }
  // Node.js environment (for Sanity CLI/config)
  return process.env[key] || fallback;
}

export const apiVersion =
  getEnv('VITE_SANITY_API_VERSION') || 
  getEnv('NEXT_PUBLIC_SANITY_API_VERSION') || 
  '2024-02-02'

export const dataset = 
  getEnv('VITE_SANITY_DATASET') || 
  getEnv('NEXT_PUBLIC_SANITY_DATASET');

export const projectId = 
  getEnv('VITE_SANITY_PROJECT_ID') || 
  getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');

export const useCdn = false

