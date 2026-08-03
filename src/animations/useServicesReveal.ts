import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTORS = {
  image: '[data-services-image]',
  label: '[data-services-label]',
  heading: '[data-services-heading]',
  item: '[data-services-item]',
} as const

/**
 * Scroll-triggered entrance for the Services section: the eyebrow label and
 * heading lead, then the numbered service rows reveal with a short stagger,
 * then the portrait settles in last — the list-then-image sequence the
 * motion brief calls for, deliberately the reverse of About's image-first
 * beat so the two image+copy sections don't read identically. Scoped to
 * `containerRef` and torn down on unmount, per
 * docs/animation-principles.md's "initialize only when the section
 * approaches the viewport" rule.
 */
export function useServicesReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([SELECTORS.image, SELECTORS.label, SELECTORS.heading, SELECTORS.item], {
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
          '-=0.15',
        )
        .fromTo(
          SELECTORS.image,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: DURATION.slow },
          '-=0.3',
        )
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])
}
