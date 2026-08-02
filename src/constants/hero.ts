import heroImage from '@/assets/images/hero-editorial-01.jpg.jpg'

/** Copy and asset for the homepage Hero — kept as data so future CMS migration only touches this file. */
export const HERO_CONTENT = {
  label: 'Editorial model — United Kingdom',
  heading: 'Mira',
  subtitle: 'Available across the United Kingdom, Italy, Spain & Europe.',
  image: {
    src: heroImage,
    alt: 'Mira, an editorial fashion model, photographed in close-up wearing a teal wrap top against a softly blurred backdrop.',
  },
} as const
