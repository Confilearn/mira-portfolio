import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getEntranceOffset, getEntranceTransition } from '@/utils/motion'

export interface ImageRevealProps {
  children: ReactNode
  className?: string
  /** Delay before the reveal starts, in seconds. Defaults to 0. */
  delay?: number
}

/**
 * Fades and lifts its children into view once they enter the viewport.
 * Component-entrance motion, so this uses Framer Motion per docs/animation-principles.md
 * — GSAP is reserved for hero storytelling and scroll-driven sequences.
 */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: getEntranceOffset(prefersReducedMotion) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={getEntranceTransition(prefersReducedMotion, delay)}
    >
      {children}
    </motion.div>
  )
}
