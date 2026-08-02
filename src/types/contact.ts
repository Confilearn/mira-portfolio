/** A single professional contact channel (Instagram, WhatsApp, agency website) shown in the Contact CTA. */
export interface ContactChannel {
  /** Stable identifier, used as the React key. */
  id: string
  label: string
  href: string
}
