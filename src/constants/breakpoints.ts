/**
 * Breakpoint values in px. Must stay in sync with the `--breakpoint-*` tokens
 * in src/styles/globals.css — this is the one place that duplication is
 * unavoidable, since CSS custom properties aren't readable from JS without a
 * runtime style read.
 */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS
