import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

// Read environment variables
// Vite automatically exposes VITE_* variables via import.meta.env
// We also check process.env as a fallback (available during build/Node.js context)

// @ts-ignore - import.meta exists in ESM/Vite
const getEnvVar = (key: string): string | undefined => {
  // Try import.meta.env first (browser/Vite context)
  // @ts-ignore
  if (import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  
  // Fall back to process.env (Node.js/build context)
  if (typeof process !== 'undefined' && process.env[key]) {
    return process.env[key];
  }
  
  return undefined;
};

const projectId = 
  getEnvVar('VITE_SANITY_PROJECT_ID') || 
  getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID') ||
  getEnvVar('SANITY_PROJECT_ID') ||
  'dllxpw15'; // Correct project ID (was ydllxpw15)

const dataset = 
  getEnvVar('VITE_SANITY_DATASET') || 
  getEnvVar('NEXT_PUBLIC_SANITY_DATASET') ||
  getEnvVar('SANITY_DATASET') ||
  'production'; // Fallback to ensure it works

const apiVersion = 
  getEnvVar('VITE_SANITY_API_VERSION') || 
  getEnvVar('NEXT_PUBLIC_SANITY_API_VERSION') ||
  getEnvVar('SANITY_API_VERSION') ||
  '2024-02-02';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  schema,
  plugins: [
    structureTool(),
  ],
})
