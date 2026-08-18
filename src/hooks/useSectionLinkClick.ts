import type { MouseEvent } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Vertical offset (px) reserved for the fixed navbar when landing on a section. */
export const NAV_SCROLL_OFFSET = -96

/**
 * Click handler for in-page anchor links (`#gallery`, `#about`, …): smoothly
 * scrolls to the target section via Lenis and records the navigation in
 * browser history without a page reload. Falls back to native smooth
 * scrolling when Lenis isn't mounted (reduced motion). Leaves modified
 * clicks (cmd/ctrl/shift, middle-click) alone so links stay
 * open-in-new-tab friendly.
 */
export function useSectionLinkClick(href: string) {
  const lenisRef = useLenis()
  const prefersReducedMotion = usePrefersReducedMotion()

  return function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith('#')) return
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const targetId = href.slice(1)
    const target = targetId === '' ? null : document.getElementById(targetId)
    if (!target) return

    event.preventDefault()

    const lenis = lenisRef?.current
    if (lenis) {
      lenis.scrollTo(target, { offset: NAV_SCROLL_OFFSET })
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    }

    window.history.pushState(null, '', href)
  }
}
