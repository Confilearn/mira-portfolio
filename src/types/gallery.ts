/** A single editorial photograph shown in the Gallery grid and its Lightbox. */
export interface GalleryImage {
  /** Stable identifier, used as the React key and lightbox aria-label context. */
  id: string
  src: string
  alt: string
  /** Intrinsic pixel width of the source file. Read from the asset, never estimated. */
  width: number
  /** Intrinsic pixel height of the source file. Read from the asset, never estimated. */
  height: number
  /**
   * CSS aspect-ratio of the tile as laid out in the gallery, measured from
   * homepage-desktop-design. Taller than the source frame, so `object-fit: cover`
   * trims the sides for the editorial crop — the Lightbox still shows the full
   * uncropped photo.
   */
  displayRatio: string
  /**
   * Tile height in px below `sm`, measured from homepage-mobile-design. Fixed
   * rather than derived from `displayRatio` so the height does not shrink with
   * the viewport — the narrowing column crops the photo's width instead of
   * scaling the whole frame down.
   */
  mobileHeight: number
}
