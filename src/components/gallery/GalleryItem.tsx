import { LazyImage } from '@/components/images'
import type { GalleryImage } from '@/types/gallery'

export interface GalleryItemProps {
  image: GalleryImage
  /** Zero-based position within the grid, used for the accessible label and reveal stagger. */
  index: number
  total: number
  onOpen: (index: number) => void
}

/**
 * Single gallery tile: a subtle hover scale + soft overlay on the image, and
 * a zoom cursor, all handled in CSS per docs/animation-principles.md. Clicking
 * opens the shared Lightbox at this tile's index. `data-gallery-item` is the
 * hook targeted by useGalleryReveal's scroll-triggered stagger.
 */
export function GalleryItem({ image, index, total, onOpen }: GalleryItemProps) {
  return (
    <li data-gallery-item className="mb-6 break-inside-avoid lg:mb-8">
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open image ${index + 1} of ${total} in fullscreen: ${image.alt}`}
        className="group focus-visible:ring-ring focus-visible:ring-offset-background block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <span className="relative block">
          <LazyImage
            src={image.src}
            alt={image.alt}
            aspectRatio={image.aspectRatio}
            className="transition-transform duration-[var(--duration-slow)] ease-editorial group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="bg-primary/0 group-hover:bg-primary/10 absolute inset-0 transition-colors duration-[var(--duration-normal)] ease-editorial"
          />
        </span>
      </button>
    </li>
  )
}
