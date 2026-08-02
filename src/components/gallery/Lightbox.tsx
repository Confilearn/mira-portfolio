import { useEffect, useRef } from 'react'
import type { TouchEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { DURATION, EASE } from '@/constants/motion'
import { IconWrapper } from '@/components/utility'
import type { GalleryImage } from '@/types/gallery'

/** Minimum horizontal swipe distance (px) to trigger prev/next navigation. */
const SWIPE_THRESHOLD = 50

export interface LightboxProps {
  images: GalleryImage[]
  activeIndex: number
  open: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

/**
 * Fullscreen, reusable image viewer: focus-trapped, keyboard- and
 * touch-navigable, closes on Escape or backdrop click, locks background
 * scroll while open. Framer Motion owns the open/close transition per
 * docs/animation-principles.md (modal transitions are its responsibility).
 * Deliberately generic — takes any `GalleryImage[]` — so future pages (a
 * dedicated portfolio page, journal entries, …) can reuse it unchanged.
 */
export function Lightbox({
  images,
  activeIndex,
  open,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useFocusTrap(panelRef, open)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrevious()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, onNext, onPrevious])

  const transition = { duration: prefersReducedMotion ? 0 : DURATION.normal, ease: EASE.editorial }
  const activeImage = images[activeIndex]
  const hasMultiple = images.length > 1

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current
    touchStartX.current = null
    if (startX === null) return

    const endX = event.changedTouches[0]?.clientX ?? startX
    const deltaX = endX - startX

    if (deltaX > SWIPE_THRESHOLD) onPrevious()
    else if (deltaX < -SWIPE_THRESHOLD) onNext()
  }

  return (
    <AnimatePresence>
      {open && activeImage && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${activeIndex + 1} of ${images.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-ink/95 fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close fullscreen image"
            className="text-ink-foreground absolute top-4 right-4 transition-opacity duration-[var(--duration-fast)] ease-editorial hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:top-6 sm:right-6"
          >
            <IconWrapper icon={X} size="lg" />
          </button>

          {hasMultiple && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onPrevious()
              }}
              aria-label="Previous image"
              className="text-ink-foreground absolute left-2 transition-opacity duration-[var(--duration-fast)] ease-editorial hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            >
              <IconWrapper icon={ChevronLeft} size="lg" />
            </button>
          )}

          <motion.figure
            key={activeImage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-full max-w-full"
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[85svh] max-w-[90vw] object-contain"
            />
          </motion.figure>

          {hasMultiple && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onNext()
              }}
              aria-label="Next image"
              className="text-ink-foreground absolute right-2 transition-opacity duration-[var(--duration-fast)] ease-editorial hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <IconWrapper icon={ChevronRight} size="lg" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
