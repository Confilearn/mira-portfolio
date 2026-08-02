import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTORS = {
  label: '[data-agency-label]',
  heading: '[data-agency-heading]',
  paragraph: '[data-agency-paragraph]',
  cta: '[data-agency-cta]',
} as const

/**
 * Scroll-triggered fade-in for the Agency section: label, heading, paragraph
 * and CTA reveal in sequence once the section approaches the viewport.
 * Scoped to `containerRef` and torn down on unmount, per
 * docs/animation-principles.md's "initialize only when the section
 * approaches the viewport" rule.
 */
export function useAgencyReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([SELECTORS.label, SELECTORS.heading, SELECTORS.paragraph, SELECTORS.cta], {
          opacity: 1,
          y: 0,
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
        .fromTo(
          SELECTORS.heading,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: DURATION.slow },
          '-=0.25',
        )
        .fromTo(
          SELECTORS.paragraph,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: DURATION.normal },
          '-=0.3',
        )
        .fromTo(SELECTORS.cta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: DURATION.fast }, '-=0.2')
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])
}
