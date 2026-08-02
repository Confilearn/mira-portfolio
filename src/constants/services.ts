import type { ServiceItem } from '@/types/services'
import portraitImage from '@/assets/images/hero-editorial-01.jpg.jpg'

const SERVICES: ServiceItem[] = [
  { id: 'editorial', name: 'Editorial' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'runway', name: 'Runway' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'campaign', name: 'Campaign' },
  { id: 'brand-collaborations', name: 'Brand Collaborations' },
]

/** Copy and assets for the homepage Services section — kept as data so future CMS migration only touches this file. */
export const SERVICES_CONTENT = {
  label: 'Services',
  heading: 'What Mira Offers',
  services: SERVICES,
  image: {
    src: portraitImage,
    alt: 'Mira photographed in close-up, chin lowered, wearing a teal wrap top against a softly blurred backdrop.',
  },
} as const
