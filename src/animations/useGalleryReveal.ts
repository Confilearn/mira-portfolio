import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DURATION, GSAP_EASE } from '@/constants/motion'

const SELECTOR = '[data-gallery-item]'

/**
 * Scroll-triggered staggered entrance for the Gallery grid: each tile fades
 * and lifts in as the grid approaches the viewport. Opacity/translateY only,
 * per docs/animation-principles.md's performance rules. Scoped to
 * `containerRef` and torn down on unmount.
 */
export function useGalleryReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(SELECTOR, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        SELECTOR,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.slow,
          ease: GSAP_EASE.editorial,
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            once: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])
}
