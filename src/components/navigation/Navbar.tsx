import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout'
import { NAV_SECTION_IDS } from '@/constants/navigation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useScrolled } from '@/hooks/useScrolled'
import { useScrollSpy } from '@/hooks/useScrollSpy'
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
  const activeId = useScrollSpy(NAV_SECTION_IDS)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -getEntranceOffset(prefersReducedMotion, 16) }}
      animate={{ opacity: 1, y: 0 }}
      transition={getEntranceTransition(prefersReducedMotion, 0.35)}
      className={cn(
        'fixed inset-x-0 top-0',
        'transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-normal)] ease-editorial',
        // Raised above the mobile overlay (z-modal) while it's open, so the
        // logo and the hamburger's morphed close (X) icon stay visible and
        // interactive on top of the fullscreen panel.
        mobileMenuOpen ? 'z-[var(--z-toast)]' : 'z-[var(--z-nav)]',
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
        <DesktopNavigation className="hidden md:block" activeId={activeId} />
        <MobileNavigation
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
          activeId={activeId}
        />
      </Container>
    </motion.header>
  )
}
