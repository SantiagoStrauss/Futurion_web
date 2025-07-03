import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

// Validar que el projectId tenga el formato correcto
const validateProjectId = (id: string) => {
  const validPattern = /^[a-z0-9-]+$/
  if (!validPattern.test(id)) {
    console.warn(`Invalid Sanity project ID: ${id}. Using fallback.`)
    return 'temp-project-id'
  }
  return id
}

export const client = createClient({
  projectId: validateProjectId(projectId),
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
