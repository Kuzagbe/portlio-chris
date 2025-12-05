import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { schema } from './src/sanity/schemaTypes'

// Read environment variables
// During Sanity Studio build/deploy, we're in Node.js context (process.env)
// We use process.env only to avoid CJS/ESM compatibility issues with import.meta

const getEnvVar = (key: string): string | undefined => {
  // Use process.env (works in both Node.js build and browser via dotenv)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
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
    codeInput(),
  ],
})
