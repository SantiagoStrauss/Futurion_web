/**
 * This route is responsible for the embedded Sanity Studio.
 * 
 * `/app/studio/[[...tool]]/page.tsx`
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const runtime = 'edge'

export default function StudioPage() {
  return <NextStudio config={config} />
}
