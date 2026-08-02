import type { ContactChannel } from '@/types/contact'
import { AGENCY_CONTENT } from './agency'
import { GALLERY_CONTENT } from './gallery'

const CONTACT_LINKS: ContactChannel[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/miraelizabethokeke' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/447000000000' },
  { id: 'agency', label: 'Zane Models', href: AGENCY_CONTENT.cta.href },
]

/**
 * Copy and assets for the homepage Contact section — kept as data so future
 * CMS migration only touches this file. The contact sheet reuses the
 * Gallery's photographs (a proof sheet shows frames from the same shoot)
 * rather than importing duplicate image assets.
 */
export const CONTACT_CONTENT = {
  sheet: {
    label: '@miraelizabethokeke',
    heading: 'Contact Sheet',
    images: GALLERY_CONTENT.images,
  },
  cta: {
    heading: "Let's Create Something Timeless",
    links: CONTACT_LINKS,
  },
} as const
