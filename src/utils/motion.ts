import type { Transition } from 'framer-motion'
import { DURATION, EASE } from '@/constants/motion'

/** Standard entrance transition; collapses to instant when reduced motion is preferred. */
export function getEntranceTransition(prefersReducedMotion: boolean, delay = 0): Transition {
  return {
    duration: prefersReducedMotion ? 0 : DURATION.slow,
    delay: prefersReducedMotion ? 0 : delay,
    ease: EASE.editorial,
  }
}

/** Vertical offset for fade/rise entrances; collapses to a plain fade when reduced motion is preferred. */
export function getEntranceOffset(prefersReducedMotion: boolean, distance = 24) {
  return prefersReducedMotion ? 0 : distance
}
