import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/types/gallery'
import { GalleryItem } from './GalleryItem'

export interface GalleryGridProps {
  images: GalleryImage[]
  onImageOpen: (index: number) => void
  className?: string
}

/**
 * Editorial gallery layout: a CSS multi-column masonry (2 columns on mobile,
 * 3 from `lg`) rather than a uniform grid, so tiles with different aspect
 * ratios settle into a curated, staggered rhythm instead of aligning edge to
 * edge. `break-inside-avoid` on each tile (in GalleryItem) keeps images from
 * splitting across columns.
 */
export function GalleryGrid({ images, onImageOpen, className }: GalleryGridProps) {
  return (
    <ul className={cn('columns-2 gap-6 lg:columns-3 lg:gap-8', className)}>
      {images.map((image, index) => (
        <GalleryItem
          key={image.id}
          image={image}
          index={index}
          total={images.length}
          onOpen={onImageOpen}
        />
      ))}
    </ul>
  )
}
