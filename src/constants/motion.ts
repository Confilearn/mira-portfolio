/**
 * Motion timing for JS-driven animation (Framer Motion, GSAP). Values mirror
 * the `--duration-*` and `--ease-*` tokens in src/styles/globals.css, converted
 * to the seconds/array formats those libraries expect.
 */
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  hero: 0.9,
} as const

/** Cubic-bezier curves as [x1, y1, x2, y2], matching --ease-* in globals.css. */
export const EASE = {
  editorial: [0.16, 1, 0.3, 1],
  soft: [0.22, 1, 0.36, 1],
  inOutSoft: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, [number, number, number, number]>
