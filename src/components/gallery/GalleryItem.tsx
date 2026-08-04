import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { LazyImage } from '@/components/images'
import type { GalleryImage } from '@/types/gallery'

/** Tiles beyond this index load lazily; the first two are likely in view on arrival. */
const EAGER_TILE_COUNT = 2

export interface GalleryItemProps {
  image: GalleryImage
  /** Zero-based position within the grid, used for the accessible label and reveal stagger. */
  index: number
  total: number
  /** Zero-based grid column, published to the DOM so useGalleryParallax can group tiles by column. */
  column: number
  /** Sits in the middle column, which hangs lower than its neighbours. */
  inOffsetColumn?: boolean
  onOpen: (index: number) => void
}

/**
 * Single gallery tile: a subtle hover scale + brightness lift on the image,
 * and a zoom cursor, all handled in CSS per docs/animation-principles.md.
 * Clicking opens the shared Lightbox at this tile's index. `data-gallery-item`
 * is the hook targeted by useGalleryReveal's scroll-triggered stagger, and
 * `data-gallery-parallax` — one level in, on the button — the one targeted by
 * useGalleryParallax's per-column drift, so the two never write to the same
 * element's transform.
 *
 * Below `sm` the tile is a fixed `mobileHeight`, so narrowing the viewport crops
 * the photo's width instead of scaling the whole frame down; from `sm` up the
 * height is released and `displayRatio` takes over. Spacing between tiles comes
 * from the grid's `gap` in GalleryGrid, not from margins here.
 */
export function GalleryItem({
  image,
  index,
  total,
  column,
  inOffsetColumn,
  onOpen,
}: GalleryItemProps) {
  return (
    <li
      data-gallery-item
      className={cn(inOffsetColumn && 'mt-[clamp(56px,6vw,96px)]')}
      style={{ '--tile-height': `${image.mobileHeight}px` } as CSSProperties}
    >
      <button
        type="button"
        data-gallery-parallax={column}
        onClick={() => onOpen(index)}
        aria-label={`Open image ${index + 1} of ${total} in fullscreen: ${image.alt}`}
        className="group focus-visible:ring-ring focus-visible:ring-offset-background block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <LazyImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          aspectRatio={image.displayRatio}
          wrapperClassName="h-[var(--tile-height)] sm:h-auto"
          loading={index < EAGER_TILE_COUNT ? 'eager' : 'lazy'}
          className="block h-full w-full object-top transition-[transform,filter] duration-[var(--duration-normal)] ease-editorial group-hover:scale-[1.025] group-hover:brightness-[1.04]"
        />
      </button>
    </li>
  )
}
