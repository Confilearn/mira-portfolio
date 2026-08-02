import { LazyImage } from '@/components/images'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/types/gallery'

export interface ContactSheetStripProps {
  images: GalleryImage[]
  className?: string
}

/**
 * Contact sheet grid: two columns stacking into three rows on mobile, three
 * on tablet, and a single row spanning the full container width on desktop —
 * matching the approved design's evenly-spaced desktop strip. Each frame
 * carries a proof-sheet frame number overlaid in the bottom-left corner,
 * echoing the numbered list pattern used in the Services section.
 * `data-contact-item` is the hook targeted by useContactReveal's stagger.
 */
export function ContactSheetStrip({ images, className }: ContactSheetStripProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6',
        className,
      )}
    >
      {images.map((image, index) => (
        <li key={image.id} data-contact-item className="relative">
          <LazyImage
            src={image.src}
            alt={image.alt}
            aspectRatio="1 / 1"
            className="transition-transform duration-[var(--duration-slow)] ease-editorial hover:scale-[1.04]"
          />
          <span className="text-label text-accent drop-shadow-sm absolute bottom-2 left-2 font-sans">
            {String(index + 1).padStart(2, '0')}
          </span>
        </li>
      ))}
    </ul>
  )
}
