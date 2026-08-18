import { useLayoutEffect, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger } from './gsap'

export interface UseServicesScrollSyncOptions {
  /** Selector (scoped to containerRef) matching one element per category, in list order. */
  selector: string
  /** Called with the index of the image currently holding the viewport midpoint. */
  onActiveChange: (index: number) => void
  /** Desktop-only: pass `false` below `lg`, where the images are display:none and have no scroll positions. */
  enabled?: boolean
}

/**
 * Drives the Services tab list from scroll position: each category image owns
 * the active state for as long as it straddles the middle of the viewport.
 * The threshold is deliberately the midpoint rather than the top edge — it is
 * the point at which a reader would say an image is "the one they're looking
 * at" — and both `onEnter` and `onEnterBack` are wired, so the list replays
 * its states in reverse when you scroll back up.
 *
 * No tween is involved: these are bare ScrollTriggers reporting a state change
 * to React, so nothing here competes with useServicesReveal's entrance. Scoped
 * to `containerRef` and torn down on unmount — including when `enabled` flips
 * at the breakpoint.
 */
export function useServicesScrollSync(
  containerRef: RefObject<HTMLElement | null>,
  { selector, onActiveChange, enabled = true }: UseServicesScrollSyncOptions,
) {
  // Held in a ref so a fresh callback identity never rebuilds the triggers.
  const handlerRef = useRef(onActiveChange)

  useLayoutEffect(() => {
    handlerRef.current = onActiveChange
  }, [onActiveChange])

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root || !enabled) return

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>(selector)
      if (images.length === 0) return

      images.forEach((image, index) => {
        ScrollTrigger.create({
          trigger: image,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => handlerRef.current(index),
          onEnterBack: () => handlerRef.current(index),
          invalidateOnRefresh: true,
        })
      })

      // ScrollTrigger only reports transitions, so an image already sitting on
      // the midpoint at mount (a reload part-way down the page, or a resize
      // across the breakpoint) would otherwise leave the list on a stale row.
      const midpoint = window.innerHeight / 2
      const current = images.findIndex((image) => {
        const { top, bottom } = image.getBoundingClientRect()
        return top <= midpoint && bottom >= midpoint
      })
      if (current !== -1) handlerRef.current(current)
    }, root)

    return () => ctx.revert()
  }, [containerRef, enabled, selector])
}
