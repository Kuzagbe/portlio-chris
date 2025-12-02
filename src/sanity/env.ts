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
function getEnv(key: string, fallback?: string): string | undefined {
  // In browser/Vite context, try to access import.meta.env
  if (typeof window !== 'undefined') {
    try {
      // Access import.meta.env using eval to avoid CJS syntax errors
      // @ts-ignore - import.meta only exists in ESM/Vite
      const meta = eval('typeof import !== "undefined" ? import.meta : undefined');
      if (meta && meta.env && meta.env[key]) {
        return meta.env[key];
      }
    } catch {
      // Not in ESM context, fall through to process.env
    }
  }
  
  // Fall back to process.env (works in Node.js, and Vite can inject it)
  return process.env[key] || fallback;
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
