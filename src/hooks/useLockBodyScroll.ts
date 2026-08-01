import { useEffect } from 'react'

/** Locks page scroll while `locked` is true (e.g. while the fullscreen mobile menu is open). */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [locked])
}
