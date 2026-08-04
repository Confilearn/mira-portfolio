import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { useParallaxIntensity } from './parallax'

/**
 * Where the drift is scrubbed against.
 *
 * `through` — the element scrolls up into view from below (the Introduction
 * portrait, the About runway image). The drift runs from just after the image
 * appears to just before it leaves, so almost all of the travel is spent while
 * the photograph is actually on screen rather than half off either edge.
 *
 * `leave`   — the element is already in view when the page loads (the Hero).
 * The drift runs from the very first pixel of scroll to the moment the element
 * clears the top, so the photograph trails the page from the outset.
 */
export type ParallaxRange = 'through' | 'leave'

export interface UseParallaxOptions {
  /** Selector (scoped to containerRef) for the element to drift. Defaults to the container itself. */
  selector?: string
  /**
   * Selector (scoped to containerRef) for the element the scroll range is
   * measured against. Defaults to the container. Point this at the image's own
   * wrapper when the container is taller than the image — otherwise the drift
   * is already part-way through by the time the photograph is on screen. Must
   * be an element the parallax does not itself transform.
   */
  trigger?: string
  /**
   * Total vertical travel across the scroll range, as a percentage of the
   * element's own height — i.e. how far the photograph falls behind the page.
   * Split evenly either side of rest, so `12` drifts from -6% to +6%.
   *
   * Raising this costs framing: the element is scaled by the same amount to
   * hide the drift, so `18` crops a fifth off an `object-cover` photograph.
   */
  amount?: number
  range?: ParallaxRange
}

/**
 * Default drift for a mid-page editorial image. Read against the `through`
 * range below, this works out at roughly a 10% speed differential against the
 * page — the point at which the eye starts reading the offset as depth rather
 * than dismissing it as nothing. Anything much under this is invisible in
 * practice, however deliberate it looks in the code.
 */
const DEFAULT_AMOUNT = 18

/**
 * Scale headroom beyond the drift itself, so a rounded pixel never grazes the
 * frame edge mid-scrub.
 */
const SCALE_BUFFER = 0.02

const START_POSITION: Record<ParallaxRange, string> = {
  through: 'top 85%',
  leave: 'top top',
}

const END_POSITION: Record<ParallaxRange, string> = {
  through: 'bottom 15%',
  leave: 'bottom top',
}

/**
 * Subtle, scroll-scrubbed vertical drift for the large editorial photographs —
 * the Hero, the Introduction portrait, the About runway image — per the
 * animation brief's "use sparingly" parallax rule. Only `transform` is touched,
 * and the target is pre-scaled by exactly enough to swallow its own drift, so
 * the effect can never expose an edge or shift the layout.
 *
 * Depth is scaled by useParallaxIntensity: full on desktop, softened below
 * `lg`, and skipped entirely under prefers-reduced-motion — in which case no
 * ScrollTrigger is created at all. Scoped to `containerRef` and torn down on
 * unmount (including when the breakpoint changes, which re-runs with the new
 * intensity).
 */
export function useParallax(
  containerRef: RefObject<HTMLElement | null>,
  { selector, trigger, amount = DEFAULT_AMOUNT, range = 'through' }: UseParallaxOptions = {},
) {
  const intensity = useParallaxIntensity()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root || intensity === 0) return

    const target = selector ?? root
    // Total travel, then the half of it applied either side of rest. Scaling the
    // element by the full travel is exactly the headroom the drift consumes.
    const drift = amount * intensity
    const travel = drift / 2
    const scale = 1 + drift / 100 + SCALE_BUFFER

    const ctx = gsap.context(() => {
      gsap.set(target, { scale, yPercent: -travel, force3D: true })
      gsap.to(target, {
        yPercent: travel,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: trigger ?? root,
          start: START_POSITION[range],
          end: END_POSITION[range],
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [containerRef, intensity, selector, trigger, amount, range])
}
