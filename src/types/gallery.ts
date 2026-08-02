/** A single editorial photograph shown in the Gallery grid and its Lightbox. */
export interface GalleryImage {
  /** Stable identifier, used as the React key and lightbox aria-label context. */
  id: string
  src: string
  alt: string
  /** CSS aspect-ratio (e.g. "4 / 5"), reserving layout space before the image loads. */
  aspectRatio: string
}
