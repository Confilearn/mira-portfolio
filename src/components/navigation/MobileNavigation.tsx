import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/utils'
import { HamburgerButton } from './HamburgerButton'
import { MobileMenuOverlay } from './MobileMenuOverlay'

export interface MobileNavigationProps {
  className?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Section id currently in view (scroll-spy), without the leading "#". */
  activeId?: string | null
}

/** Hamburger trigger + fullscreen overlay, visible below `md`. Open state is controlled by the parent Navbar. */
export function MobileNavigation({
  className,
  open,
  onOpenChange,
  activeId,
}: MobileNavigationProps) {
  useLockBodyScroll(open)

  return (
    <div className={cn('md:hidden', className)}>
      <HamburgerButton open={open} onClick={() => onOpenChange(!open)} />
      <MobileMenuOverlay open={open} onClose={() => onOpenChange(false)} activeId={activeId} />
    </div>
  )
}
