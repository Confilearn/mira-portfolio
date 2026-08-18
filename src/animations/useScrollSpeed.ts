import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { useParallaxIntensity } from './parallax'

export interface UseScrollSpeedOptions {
  /** Selector (scoped to containerRef) for the element to slow down. Defaults to the container itself. */
  selector?: string
  /**
   * Share of the page's scroll speed the element travels at. `0.8` moves it
   * 20% slower than the page — it lags on the way up and catches back up on
   * the way down.
   */
  speed?: number
}

/**
 * Scrubbed drift that makes an element scroll at a fraction of the page's
 * speed. Unlike useParallax this never scales the target, so it is safe on
 * type: only `y` is touched, and the lag is split evenly either side of rest
 * so the element sits exactly where the layout puts it as it passes the
 * middle of the viewport.
 *
 * The lag is measured in pixels against the element's own scroll range
 * (entering at the bottom of the viewport, leaving past the top), recomputed
 * on refresh so a resize or a reflowed line count keeps the ratio honest.
 * Depth is scaled by useParallaxIntensity — full on desktop, softened below
 * `lg`, and skipped entirely under prefers-reduced-motion.
 */
export function useScrollSpeed(
  containerRef: RefObject<HTMLElement | null>,
  { selector, speed = 0.8 }: UseScrollSpeedOptions = {},
) {
  const intensity = useParallaxIntensity()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root || intensity === 0) return

    const ctx = gsap.context(() => {
      const target = selector ? root.querySelector<HTMLElement>(selector) : root
      if (!target) return

      // Distance the page scrolls while the element crosses the viewport, and
      // the share of it the element gives up by running slower than the page.
      const lag = () => (1 - speed) * intensity * (window.innerHeight + target.offsetHeight)

      gsap.fromTo(
        target,
        { y: () => -lag() / 2 },
        {
          y: () => lag() / 2,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: target,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [containerRef, intensity, selector, speed])
}
