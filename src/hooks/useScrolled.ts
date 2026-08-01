import { useSyncExternalStore } from 'react'

interface UseScrolledOptions {
  /** Scroll distance in px before the page is considered "scrolled". Defaults to 80. */
  threshold?: number
}

function subscribe(callback: () => void) {
  let ticking = false

  function handleScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      callback()
      ticking = false
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}

/** Reports whether the page has scrolled past `threshold` — drives the navbar's transparent-to-solid transition. */
export function useScrolled({ threshold = 80 }: UseScrolledOptions = {}) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
}
