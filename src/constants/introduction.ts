import portraitImage from '@/assets/images/profile-portrait.jpg.jpg'

/** Copy and asset for the homepage Editorial Introduction — kept as data so future CMS migration only touches this file. */
export const INTRODUCTION_CONTENT = {
  label: 'Introducing',
  heading:
    'Born in Lagos, raised between two worlds — Mira brings a stillness in front of the camera that reads as confidence, not performance.',
  paragraph:
    'Nigerian-born, London-based. A face equally at home in the quiet of a studio and the energy of a runway, working across the United Kingdom and continental Europe.',
  image: {
    src: portraitImage,
    alt: 'Mira photographed from behind in a white halter-back top, hands resting at her waist, softly lit against a neutral studio backdrop.',
  },
} as const
