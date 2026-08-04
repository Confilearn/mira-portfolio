import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTORS = {
  copyright: '[data-footer-copyright]',
  credit: '[data-footer-credit]',
} as const

/**
 * Scroll-triggered reveal for the footer's closing bar: copyright then credit
 * rise a few pixels and fade in, in a slow, unhurried sequence — the site's
 * final beat, deliberately the slowest motion on the page so the experience
 * ends on a calm note rather than a snap.
 *
 * `top bottom` is the trigger because the footer is the last element in the
 * document: it fires the instant any part of the bar is on screen, which is
 * the one start position guaranteed to fire on every viewport height. A
 * viewport-percentage start can sit below where a bottom-of-document element
 * ever reaches, leaving the bar visible but stuck at opacity 0.
 *
 * Scoped to `containerRef` and torn down on unmount, per
 * docs/animation-principles.md's "initialize only when the section approaches
 * the viewport" rule.
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
          scrollTrigger: { trigger: root, start: 'top bottom', once: true },
        })
        .fromTo(
          SELECTORS.copyright,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: DURATION.hero },
        )
        .fromTo(
          SELECTORS.credit,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: DURATION.hero },
          '-=0.6',
        )
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])
}
