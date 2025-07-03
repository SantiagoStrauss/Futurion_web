'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/studio` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision plugin removido temporalmente para evitar errores
    // Puedes agregarlo después: visionTool({defaultApiVersion: apiVersion}),
  ],
})
