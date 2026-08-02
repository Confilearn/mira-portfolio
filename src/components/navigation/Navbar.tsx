import { motion } from 'framer-motion'
import { Container } from '@/components/layout'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'
import { getEntranceOffset, getEntranceTransition } from '@/utils/motion'
import { DesktopNavigation } from './DesktopNavigation'
import { Logo } from './Logo'
import { MobileNavigation } from './MobileNavigation'

/**
 * Site-wide navbar. Transparent over the hero; transitions to a solid,
 * blurred surface with tighter padding once scrolled past the hero threshold.
 * Background/padding are outside the transform/opacity-only rule by design —
 * this exact crossfade is what the approved design calls for.
 *
 * Fades in on mount (Framer Motion owns navigation entrances per
 * docs/animation-principles.md), timed to follow the Hero image's GSAP
 * reveal without being coupled to it.
 */
export function Navbar() {
  const scrolled = useScrolled({ threshold: 80 })
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.header
      initial={{ opacity: 0, y: -getEntranceOffset(prefersReducedMotion, 16) }}
      animate={{ opacity: 1, y: 0 }}
      transition={getEntranceTransition(prefersReducedMotion, 0.35)}
      className={cn(
        'fixed inset-x-0 top-0 z-[var(--z-nav)]',
        'transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-normal)] ease-editorial',
        scrolled
          ? 'bg-background/90 border-border supports-[backdrop-filter]:backdrop-blur-md border-b text-foreground'
          : 'border-b border-transparent bg-transparent text-ink-foreground',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between',
          'transition-[padding-top,padding-bottom] duration-[var(--duration-normal)] ease-editorial',
          scrolled ? 'py-3' : 'py-6',
        )}
      >
        <Logo />
        <DesktopNavigation className="hidden md:block" />
        <MobileNavigation />
      </Container>
    </motion.header>
  )
}
