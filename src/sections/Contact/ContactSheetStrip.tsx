import { LazyImage } from '@/components/images'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/types/gallery'

export interface ContactSheetStripProps {
  images: GalleryImage[]
  className?: string
}

/**
 * Horizontal filmstrip of proof-sheet thumbnails, evoking a photographer's
 * contact sheet. Scrolls on narrow viewports where all frames can't fit
 * side by side. `data-contact-item` is the hook targeted by
 * useContactReveal's stagger.
 */
export function ContactSheetStrip({ images, className }: ContactSheetStripProps) {
  return (
    <ul
      className={cn(
        'flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {images.map((image) => (
        <li key={image.id} data-contact-item className="w-24 shrink-0 sm:w-28 lg:w-32">
          <LazyImage
            src={image.src}
            alt={image.alt}
            aspectRatio="1 / 1"
            className="transition-transform duration-[var(--duration-slow)] ease-editorial hover:scale-[1.04]"
          />
        </li>
      ))}
    </ul>
  )
}
