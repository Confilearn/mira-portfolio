import type { GalleryImage } from '@/types/gallery'
import streetStyle from '@/assets/images/editorial-fashion-01.jpg.jpg'
import crochetDress from '@/assets/images/editorial-fashion-02.jpg.jpg'
import runwayTulle from '@/assets/images/runway-walk-01.jpg.jpg'
import maroonPortrait from '@/assets/images/beauty-shot-01.jpg.jpg'
import cherryPrint from '@/assets/images/lifestyle-01.jpg.jpg'
import pinkDress from '@/assets/images/studio-portrait-closeup.jpg.jpg'

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'street-style',
    src: streetStyle,
    alt: 'Mira wearing a black lace-trimmed slip dress layered over a white t-shirt with wide white trousers, standing against a ridged concrete facade in dark sunglasses.',
    aspectRatio: '3 / 4',
  },
  {
    id: 'crochet-dress',
    src: crochetDress,
    alt: 'Mira in a cream crochet mini dress, one arm raised to her hair, photographed against a plain studio backdrop.',
    aspectRatio: '4 / 5',
  },
  {
    id: 'runway-tulle',
    src: runwayTulle,
    alt: 'Mira walking a runway show in a fringed denim-textured bodice and skirt layered over a tiered ivory tulle underskirt.',
    aspectRatio: '2 / 3',
  },
  {
    id: 'maroon-portrait',
    src: maroonPortrait,
    alt: 'Close-up beauty portrait of Mira in a burgundy long-sleeve top with gold hoop earrings, arms crossed, against a soft neutral backdrop.',
    aspectRatio: '4 / 5',
  },
  {
    id: 'cherry-print',
    src: cherryPrint,
    alt: 'Mira wearing a cherry-print bucket hat and matching co-ord set, hands at her waist, photographed against a plain white backdrop.',
    aspectRatio: '4 / 5',
  },
  {
    id: 'pink-dress',
    src: pinkDress,
    alt: 'Mira seated in a fitted pink long-sleeve dress, photographed against pale green paneled doors.',
    aspectRatio: '3 / 4',
  },
]

/** Copy and assets for the homepage Gallery — kept as data so future CMS migration only touches this file. */
export const GALLERY_CONTENT = {
  label: 'Selected Work',
  heading: 'Gallery',
  portfolioLinkLabel: 'View Full Portfolio',
  images: GALLERY_IMAGES,
} as const
