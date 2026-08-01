import { useSyncExternalStore } from 'react'
import type { Breakpoint } from '@/constants/breakpoints'
import { minWidthQuery } from '@/utils/responsive'

function subscribe(query: string) {
  return (callback: () => void) => {
    const mediaQueryList = window.matchMedia(query)
    mediaQueryList.addEventListener('change', callback)
    return () => mediaQueryList.removeEventListener('change', callback)
  }
}

/** Reports whether the viewport currently matches or exceeds the given breakpoint. */
export function useBreakpoint(breakpoint: Breakpoint) {
  const query = minWidthQuery(breakpoint)

  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  )
}
