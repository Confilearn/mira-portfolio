import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTORS = {
  copyright: '[data-footer-copyright]',
  credit: '[data-footer-credit]',
} as const

/**
 * Scroll-triggered fade-in for the footer's closing bar: copyright then
 * credit reveal in a slow, unhurried sequence once the footer approaches the
 * viewport — the site's final beat, deliberately paced slower than the
 * section reveals above it so the experience ends on a calm note rather than
 * a snap. Scoped to `containerRef` and torn down on unmount, per
 * docs/animation-principles.md's "initialize only when the section
 * approaches the viewport" rule.
 */
export function useFooterReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([SELECTORS.copyright, SELECTORS.credit], { opacity: 1, y: 0 })
        return
      }

      gsap
        .timeline({
          defaults: { ease: GSAP_EASE.editorial },
          scrollTrigger: { trigger: root, start: 'bottom bottom', once: true },
        })
        .fromTo(SELECTORS.copyright, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: DURATION.slow })
        .fromTo(
          SELECTORS.credit,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: DURATION.slow },
          '-=0.4',
        )
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])
}
