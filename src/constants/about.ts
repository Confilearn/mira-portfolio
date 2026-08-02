import type { ProfileDetail } from '@/types/about'
import runwayImage from '@/assets/images/runway-walk-02.jpg.jpg'

const PROFILE_DETAILS: ProfileDetail[] = [
  { label: 'Age', value: '23' },
  { label: 'Height', value: "5'11\"" },
  { label: 'Nationality', value: 'Nigerian' },
  { label: 'Languages', value: 'English, Igbo' },
  { label: 'Based', value: 'London, UK' },
  { label: 'Measurements', value: 'Available on request' },
]

/** Copy and assets for the homepage About section — kept as data so future CMS migration only touches this file. */
export const ABOUT_CONTENT = {
  label: 'About',
  heading: 'The Details',
  image: {
    src: runwayImage,
    alt: 'Mira walking a runway show in a pale blue lace peplum top and matching skirt, photographed mid-stride on a pebbled garden path.',
  },
  details: PROFILE_DETAILS,
} as const
