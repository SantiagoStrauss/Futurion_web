import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// Validar que el projectId tenga el formato correcto
const validateProjectId = (id: string) => {
  const validPattern = /^[a-z0-9-]+$/
  if (!validPattern.test(id)) {
    return 'temp-project-id'
  }
  return id
}

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ 
  projectId: validateProjectId(projectId), 
  dataset 
})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
