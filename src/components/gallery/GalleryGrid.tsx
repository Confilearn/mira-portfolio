import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/types/gallery'
import { GalleryItem } from './GalleryItem'

export interface GalleryGridProps {
  images: GalleryImage[]
  onImageOpen: (index: number) => void
  className?: string
}

/** Three columns at every breakpoint, per homepage-desktop-design / homepage-mobile-design. */
const COLUMN_COUNT = 3

/** Column that hangs lower than its neighbours, creating the out-of-phase rhythm. */
const OFFSET_COLUMN = 1

/**
 * Editorial gallery layout, matching homepage-desktop-design: three equal
 * columns with the middle one hanging lower.
 *
 * A grid — not a masonry flow — because the design aligns the second row across
 * all three columns rather than letting each column close its own gaps. Tiles
 * are not stretched to fill their row (`items-start`); each keeps the shape its
 * own `displayRatio` dictates, so the row track is simply as tall as its
 * tallest photo. Grid also places items row-major, which is the design's
 * reading order, so the list stays flat and in source order.
 */
export function GalleryGrid({ images, onImageOpen, className }: GalleryGridProps) {
  return (
    <ul className={cn('grid grid-cols-3 items-start gap-[clamp(12px,2vw,36px)]', className)}>
      {images.map((image, index) => (
        <GalleryItem
          key={image.id}
          image={image}
          index={index}
          total={images.length}
          inOffsetColumn={index % COLUMN_COUNT === OFFSET_COLUMN}
          onOpen={onImageOpen}
        />
      ))}
    </ul>
  )
}
