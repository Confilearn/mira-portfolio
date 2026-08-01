import { BREAKPOINTS, type Breakpoint } from '@/constants/breakpoints'

/** Builds a `min-width` media query string for a given breakpoint token. */
export function minWidthQuery(breakpoint: Breakpoint) {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`
}
