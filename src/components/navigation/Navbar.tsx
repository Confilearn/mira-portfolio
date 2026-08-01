import { Container } from '@/components/layout'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'
import { DesktopNavigation } from './DesktopNavigation'
import { Logo } from './Logo'
import { MobileNavigation } from './MobileNavigation'

/**
 * Site-wide navbar. Transparent over the hero; transitions to a solid,
 * blurred surface with tighter padding once scrolled past the hero threshold.
 * Background/padding are outside the transform/opacity-only rule by design —
 * this exact crossfade is what the approved design calls for.
 */
export function Navbar() {
  const scrolled = useScrolled({ threshold: 80 })

  return (
    <header
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
    </header>
  )
}
