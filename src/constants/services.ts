import type { ServiceItem } from '@/types/services'
import editorialImage from '@/assets/images/hero-editorial-01.jpg.jpg'
import commercialImage from '@/assets/images/lifestyle-01.jpg.jpg'
import runwayImage from '@/assets/images/runway-walk-01.jpg.jpg'
import beautyImage from '@/assets/images/beauty-shot-01.jpg.jpg'
import campaignImage from '@/assets/images/studio-portrait-01.jpg.jpg'
import brandImage from '@/assets/images/profile-portrait.jpg.jpg'

const SERVICES: ServiceItem[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    image: {
      src: editorialImage,
      alt: 'Mira photographed in close-up, chin lowered, wearing a teal wrap top against a softly blurred backdrop.',
    },
  },
  {
    id: 'commercial',
    name: 'Commercial',
    image: {
      src: commercialImage,
      alt: 'Mira wearing a cherry-print bucket hat and matching co-ord set, hands at her waist, photographed against a plain white backdrop.',
    },
  },
  {
    id: 'runway',
    name: 'Runway',
    image: {
      src: runwayImage,
      alt: 'Mira walking a runway show in a fringed denim-textured bodice and skirt layered over a tiered ivory tulle underskirt.',
    },
  },
  {
    id: 'beauty',
    name: 'Beauty',
    image: {
      src: beautyImage,
      alt: 'Close-up beauty portrait of Mira in a burgundy long-sleeve top with gold hoop earrings, arms crossed, against a soft neutral backdrop.',
    },
  },
  {
    id: 'campaign',
    name: 'Campaign',
    image: {
      src: campaignImage,
      alt: 'Mira photographed in a studio campaign setting, composed against a clean neutral backdrop.',
    },
  },
  {
    id: 'brand-collaborations',
    name: 'Brand Collaborations',
    image: {
      src: brandImage,
      alt: 'Editorial portrait of Mira, composed for brand and collaboration work.',
    },
  },
]

/** Copy and assets for the homepage Services section — kept as data so future CMS migration only touches this file. */
export const SERVICES_CONTENT = {
  label: 'Services',
  heading: 'What Mira Offers',
  services: SERVICES,
} as const
