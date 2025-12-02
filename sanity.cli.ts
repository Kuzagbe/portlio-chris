import { defineCliConfig } from 'sanity/cli'
import dotenv from 'dotenv'

// Load .env file for Sanity CLI
dotenv.config()

import { dataset, projectId } from './src/sanity/env'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})


