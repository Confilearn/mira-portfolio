import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface UseParallaxOptions {
  /** Selector (scoped to containerRef) for the element to drift. Defaults to the container itself. */
  selector?: string
  /** Base scale applied to the element, giving headroom so the drift never exposes an edge. */
  scale?: number
  /** Maximum vertical drift, as a percent of the element's own height, in each direction. */
  amount?: number
}

/**
 * Subtle, scroll-scrubbed vertical drift for the handful of large editorial
 * images called out in docs — the Hero photograph, the About "runway"
 * portrait — per the animation brief's "use sparingly" parallax rule. The
 * target is pre-scaled so the drift stays within its own overshoot and never
 * reveals an edge. No-ops entirely under prefers-reduced-motion. Scoped to
 * `containerRef` and torn down on unmount.
 */
export function useParallax(
  containerRef: RefObject<HTMLElement | null>,
  { selector, scale = 1.08, amount = 3 }: UseParallaxOptions = {},
) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root || prefersReducedMotion) return

    const target = selector ?? root

    const ctx = gsap.context(() => {
      gsap.set(target, { scale, yPercent: -amount })
      gsap.to(target, {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion, selector, scale, amount])
}
