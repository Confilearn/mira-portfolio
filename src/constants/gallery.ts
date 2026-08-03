import type { GalleryImage } from '@/types/gallery'
import streetStyle from '@/assets/images/editorial-fashion-01.jpg.jpg'
import crochetDress from '@/assets/images/editorial-fashion-02.jpg.jpg'
import runwayTulle from '@/assets/images/runway-walk-01.jpg.jpg'
import maroonPortrait from '@/assets/images/beauty-shot-01.jpg.jpg'
import cherryPrint from '@/assets/images/lifestyle-01.jpg.jpg'
import pinkDress from '@/assets/images/studio-portrait-closeup.jpg.jpg'

/**
 * `width`/`height` are the intrinsic pixel dimensions of each source file,
 * measured from the assets themselves — re-measure if an asset is replaced.
 *
 * `displayRatio` is the tile's laid-out shape, measured off the boxes in
 * homepage-desktop-design.png (each column there is 540px wide):
 *
 *   street 540x960  crochet 540x780  runway 540x1050
 *   maroon 540x840  cherry  540x720  pink   540x930
 *
 * Every one is taller than its source frame, which is what gives the gallery
 * its vertical, editorial rhythm.
 *
 * `mobileHeight` is the same box in homepage-mobile-design.png, where the
 * columns are 108px wide:
 *
 *   street 108x635  crochet 108x515  runway 108x694
 *   maroon 108x555  cherry  108x475  pink   108x615
 *
 * The design holds height near-steady between the two breakpoints (mobile is a
 * flat 0.661x of desktop) while the column width drops to 0.20x, so on a phone
 * the frame is cropped narrower rather than scaled down.
 */
const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'street-style',
    src: streetStyle,
    alt: 'Mira wearing a black lace-trimmed slip dress layered over a white t-shirt with wide white trousers, standing against a ridged concrete facade in dark sunglasses.',
    width: 1080,
    height: 1440,
    displayRatio: '9 / 16',
    mobileHeight: 635,
  },
  {
    id: 'crochet-dress',
    src: crochetDress,
    alt: 'Mira in a cream crochet mini dress, one arm raised to her hair, photographed against a plain studio backdrop.',
    width: 1080,
    height: 1440,
    displayRatio: '9 / 13',
    mobileHeight: 515,
  },
  {
    id: 'runway-tulle',
    src: runwayTulle,
    alt: 'Mira walking a runway show in a fringed denim-textured bodice and skirt layered over a tiered ivory tulle underskirt.',
    width: 1440,
    height: 1920,
    displayRatio: '18 / 35',
    mobileHeight: 694,
  },
  {
    id: 'maroon-portrait',
    src: maroonPortrait,
    alt: 'Close-up beauty portrait of Mira in a burgundy long-sleeve top with gold hoop earrings, arms crossed, against a soft neutral backdrop.',
    width: 662,
    height: 882,
    displayRatio: '9 / 14',
    mobileHeight: 555,
  },
  {
    id: 'cherry-print',
    src: cherryPrint,
    alt: 'Mira wearing a cherry-print bucket hat and matching co-ord set, hands at her waist, photographed against a plain white backdrop.',
    width: 1100,
    height: 1357,
    displayRatio: '3 / 4',
    mobileHeight: 475,
  },
  {
    id: 'pink-dress',
    src: pinkDress,
    alt: 'Mira seated in a fitted pink long-sleeve dress, photographed against pale green paneled doors.',
    width: 1066,
    height: 1094,
    displayRatio: '18 / 31',
    mobileHeight: 615,
  },
]

/** Copy and assets for the homepage Gallery — kept as data so future CMS migration only touches this file. */
export const GALLERY_CONTENT = {
  label: 'Selected Work',
  heading: 'Gallery',
  portfolioLinkLabel: 'View Full Portfolio',
  images: GALLERY_IMAGES,
} as const
