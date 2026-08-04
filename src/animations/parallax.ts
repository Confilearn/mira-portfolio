import { useBreakpoint } from '@/hooks/useBreakpoint'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** At and above this breakpoint parallax runs at full depth; below it, at MOBILE_INTENSITY. */
const DESKTOP_BREAKPOINT = 'lg'

/**
 * Share of the desktop drift kept on phones and tablets. Touch scrolling covers
 * far more distance per gesture than a wheel, so the same drift reads as a
 * lurch rather than depth — and the smaller GPUs have less headroom to spare.
 */
const MOBILE_INTENSITY = 0.45

/**
 * The single multiplier every parallax hook scales its drift by, so depth stays
 * consistent across the page and there is one place to tune it:
 *
 *   0                 — effect disabled outright (prefers-reduced-motion)
 *   MOBILE_INTENSITY  — softened depth below `lg`
 *   1                 — full desktop depth
 *
 * Hooks should bail out entirely on `0` rather than running a zero-distance
 * tween, so no ScrollTrigger is created when motion is not wanted.
 */
export function useParallaxIntensity(): number {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isDesktop = useBreakpoint(DESKTOP_BREAKPOINT)

  if (prefersReducedMotion) return 0

  return isDesktop ? 1 : MOBILE_INTENSITY
}
