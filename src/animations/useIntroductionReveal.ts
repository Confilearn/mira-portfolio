import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTORS = {
  label: '[data-intro-label]',
  heading: '[data-intro-heading]',
  paragraph: '[data-intro-paragraph]',
  image: '[data-intro-image]',
} as const

/**
 * Scroll-triggered entrance for the Editorial Introduction: label, heading,
 * supporting paragraph and portrait reveal in sequence once the section
 * approaches the viewport. Scoped to `containerRef` and torn down on
 * unmount, per docs/animation-principles.md's "initialize only when the
 * section approaches the viewport" rule.
 */
export function useIntroductionReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([SELECTORS.label, SELECTORS.heading, SELECTORS.paragraph, SELECTORS.image], {
          opacity: 1,
          y: 0,
          scale: 1,
        })
        return
      }

      const timeline = gsap.timeline({
        defaults: { ease: GSAP_EASE.editorial },
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          once: true,
        },
      })

      timeline
        .fromTo(SELECTORS.label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: DURATION.normal })
        .fromTo(SELECTORS.heading, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: DURATION.slow }, '-=0.2')
        .fromTo(
          SELECTORS.paragraph,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: DURATION.normal },
          '-=0.3',
        )
        .fromTo(
          SELECTORS.image,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: DURATION.slow },
          '-=0.25',
        )
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])
}
