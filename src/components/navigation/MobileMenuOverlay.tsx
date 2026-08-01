import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/constants/navigation'
import { DURATION, EASE } from '@/constants/motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { NavigationLink } from './NavigationLink'

export interface MobileMenuOverlayProps {
  open: boolean
  onClose: () => void
}

/** Fullscreen mobile menu panel — animated, focus-trapped, closes on Escape or link activation. */
export function MobileMenuOverlay({ open, onClose }: MobileMenuOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const panelTransition = {
    duration: prefersReducedMotion ? 0 : DURATION.normal,
    ease: EASE.editorial,
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={panelTransition}
          className="bg-ink text-ink-foreground fixed inset-0 z-[var(--z-modal)] flex flex-col md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-1 items-center justify-center">
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  transition={{
                    ...panelTransition,
                    delay: prefersReducedMotion ? 0 : 0.05 * index,
                  }}
                >
                  <NavigationLink
                    href={link.href}
                    onClick={onClose}
                    className="font-display text-display-md font-normal tracking-normal normal-case"
                  >
                    {link.label}
                  </NavigationLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
