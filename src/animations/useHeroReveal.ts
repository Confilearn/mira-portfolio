import { useLayoutEffect, type RefObject } from 'react'
import SplitType from 'split-type'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTORS = {
  image: '[data-hero-image]',
  label: '[data-hero-label]',
  heading: '[data-hero-heading]',
  subtitle: '[data-hero-subtitle]',
  scroll: '[data-hero-scroll]',
} as const

/**
 * Cinematic entrance timeline for the Hero: image fades/settles in, then the
 * editorial heading reveals letter-by-letter (SplitType), then supporting
 * copy and the scroll indicator follow. Scoped to `containerRef` and torn
 * down on unmount so nothing leaks past the Hero's lifetime.
 */
export function useHeroReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const headingEl = root.querySelector<HTMLElement>(SELECTORS.heading)
    let splitHeading: SplitType | null = null

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([SELECTORS.image, SELECTORS.label, SELECTORS.heading, SELECTORS.subtitle, SELECTORS.scroll], {
          opacity: 1,
          y: 0,
          scale: 1,
        })
        return
      }

      if (headingEl) {
        splitHeading = new SplitType(headingEl, { types: 'chars' })
      }

      const timeline = gsap.timeline({ defaults: { ease: GSAP_EASE.editorial } })

      timeline
        .fromTo(
          SELECTORS.image,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: DURATION.hero * 1.3 },
        )
        .fromTo(
          SELECTORS.label,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: DURATION.slow },
          '-=0.65',
        )
        .fromTo(
          splitHeading?.chars && splitHeading.chars.length > 0 ? splitHeading.chars : SELECTORS.heading,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: DURATION.slow, stagger: 0.045 },
          '-=0.3',
        )
        .fromTo(
          SELECTORS.subtitle,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: DURATION.slow },
          '-=0.35',
        )
        .fromTo(SELECTORS.scroll, { opacity: 0 }, { opacity: 1, duration: DURATION.normal }, '-=0.15')
    }, root)

    return () => {
      ctx.revert()
      splitHeading?.revert()
    }
  }, [containerRef, prefersReducedMotion])
}
