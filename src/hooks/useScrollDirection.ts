import { useEffect, useRef, useState } from 'react'

type ScrollDirection = 'up' | 'down' | null

interface UseScrollDirectionOptions {
  /** Minimum scroll delta in px before a direction change is reported. Defaults to 8. */
  threshold?: number
}

/** Tracks whether the page is currently being scrolled up or down (e.g. to show/hide a navbar). */
export function useScrollDirection({ threshold = 8 }: UseScrollDirectionOptions = {}) {
  const [direction, setDirection] = useState<ScrollDirection>(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    function handleScroll() {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY.current

        if (Math.abs(delta) >= threshold) {
          setDirection(delta > 0 ? 'down' : 'up')
          lastScrollY.current = currentScrollY
        }

        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return direction
}
