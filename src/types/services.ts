/** A single modelling category shown in the Services section's numbered list. */
export interface ServiceItem {
  /** Stable identifier, used as the React key. */
  id: string
  name: string
  /** Editorial preview image shown when this category is active (hovered, focused or tapped). */
  image: {
    src: string
    alt: string
  }
}
