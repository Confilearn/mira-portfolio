/** A single row in the About section's professional details list (age, height, nationality, …). */
export interface ProfileDetail {
  label: string
  /** Display value, or a placeholder string (e.g. "Available on request") when unavailable. */
  value: string
}
