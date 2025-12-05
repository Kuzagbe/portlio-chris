// Support both Vite (browser) and Node.js (Sanity CLI/config) environments
// This file is used in both ESM (Vite) and CJS (Sanity CLI) contexts

// Load .env file in Node.js context only (for Sanity CLI)
if (typeof window === 'undefined' && typeof process !== 'undefined' && typeof process.cwd === 'function') {
  try {
    require('dotenv').config();
  } catch {
    // dotenv not available or already loaded
  }
}

// Get environment variable - works in both contexts
// Prioritize process.env to avoid CJS build issues with import.meta
function getEnv(key: string, fallback?: string): string | undefined {
  // Try process.env first (works in both Node.js build and browser via dotenv)
  if (typeof process !== 'undefined' && process.env) {
    const value = process.env[key];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }
  
  // Note: import.meta.env is only available in Vite/browser ESM context
  // During Sanity Studio build (CJS), we skip this to avoid parsing errors
  // The process.env values (loaded via dotenv) should be sufficient
  
  return fallback;
}

export const apiVersion =
  getEnv('VITE_SANITY_API_VERSION') || 
  getEnv('NEXT_PUBLIC_SANITY_API_VERSION') || 
  getEnv('SANITY_API_VERSION') ||
  '2024-02-02'

export const dataset = 
  getEnv('VITE_SANITY_DATASET') || 
  getEnv('NEXT_PUBLIC_SANITY_DATASET') ||
  getEnv('SANITY_DATASET') ||
  undefined;

export const projectId = 
  getEnv('VITE_SANITY_PROJECT_ID') || 
  getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID') ||
  getEnv('SANITY_PROJECT_ID') ||
  undefined;


export const useCdn = false

// Debug logging in browser
if (typeof window !== 'undefined') {
  console.log('🌍 Environment variables:', {
    VITE_SANITY_PROJECT_ID: getEnv('VITE_SANITY_PROJECT_ID'),
    VITE_SANITY_DATASET: getEnv('VITE_SANITY_DATASET'),
    VITE_SANITY_API_VERSION: getEnv('VITE_SANITY_API_VERSION'),
    projectId,
    dataset,
    apiVersion
  })
}
