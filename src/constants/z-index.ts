/**
 * Semantic z-index layers for JS contexts (e.g. Framer Motion `style` props)
 * that need a number rather than a CSS variable. Mirrors --z-* in globals.css.
 */
export const Z_INDEX = {
  base: 0,
  sticky: 10,
  nav: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
} as const
