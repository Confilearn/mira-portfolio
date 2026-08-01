import { useState } from 'react'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/utils'
import { HamburgerButton } from './HamburgerButton'
import { MobileMenuOverlay } from './MobileMenuOverlay'

export interface MobileNavigationProps {
  className?: string
}

/** Hamburger trigger + fullscreen overlay, visible below `md`. Owns the open/closed state. */
export function MobileNavigation({ className }: MobileNavigationProps) {
  const [open, setOpen] = useState(false)

  useLockBodyScroll(open)

  return (
    <div className={cn('md:hidden', className)}>
      <HamburgerButton open={open} onClick={() => setOpen((value) => !value)} />
      <MobileMenuOverlay open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
