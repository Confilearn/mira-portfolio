import { useCallback, useState } from 'react'

/** Manages open/active-index state for a Lightbox over `count` items. Reusable across any gallery. */
export function useLightbox(count: number) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const open = useCallback((index: number) => setActiveIndex(index), [])
  const close = useCallback(() => setActiveIndex(null), [])

  const next = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % count))
  }, [count])

  const previous = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current - 1 + count) % count))
  }, [count])

  return { activeIndex, isOpen: activeIndex !== null, open, close, next, previous }
}
