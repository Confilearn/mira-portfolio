import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTORS = {
  sheet: '[data-contact-sheet]',
  label: '[data-contact-label]',
  heading: '[data-contact-heading]',
  item: '[data-contact-item]',
  cta: '[data-contact-cta]',
  ctaHeading: '[data-contact-cta-heading]',
  ctaLink: '[data-contact-cta-link]',
} as const

/**
 * Scroll-triggered entrance for the Contact section, split into two
 * independent timelines because the light contact-sheet block and the dark
 * CTA block sit far apart vertically: the sheet's label, heading and
 * thumbnail strip reveal in sequence when it approaches the viewport, and
 * the CTA's heading and links reveal in sequence when it separately
 * approaches the viewport. Scoped to `containerRef` and torn down on
 * unmount, per docs/animation-principles.md's "initialize only when the
 * section approaches the viewport" rule.
 */
export function useContactReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [SELECTORS.label, SELECTORS.heading, SELECTORS.item, SELECTORS.ctaHeading, SELECTORS.ctaLink],
          { opacity: 1, y: 0 },
        )
        return
      }

      gsap
        .timeline({
          defaults: { ease: GSAP_EASE.editorial },
          scrollTrigger: { trigger: SELECTORS.sheet, start: 'top 75%', once: true },
        })
        .fromTo(SELECTORS.label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: DURATION.normal })
        .fromTo(
          SELECTORS.heading,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: DURATION.normal },
          '-=0.25',
        )
        .fromTo(
          SELECTORS.item,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: DURATION.fast, stagger: 0.06 },
          '-=0.2',
        )

      gsap
        .timeline({
          defaults: { ease: GSAP_EASE.editorial },
          scrollTrigger: { trigger: SELECTORS.cta, start: 'top 75%', once: true },
        })
        .fromTo(SELECTORS.ctaHeading, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: DURATION.slow })
        .fromTo(
          SELECTORS.ctaLink,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: DURATION.fast, stagger: 0.08 },
          '-=0.25',
        )
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])
}
