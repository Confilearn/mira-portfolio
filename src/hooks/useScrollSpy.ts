import { useEffect, useState } from 'react'

/**
 * Tracks which of the given section ids currently occupies the "active"
 * band near the top of the viewport, for scroll-spy navigation. Uses
 * IntersectionObserver rather than scroll-position math so it stays cheap
 * during Lenis-driven smooth scrolling.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
        )
        setActiveId(topMost.target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
