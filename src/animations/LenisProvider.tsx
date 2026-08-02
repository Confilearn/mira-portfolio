import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type Lenis from 'lenis'
import { createLenis } from './lenis'
import { gsap, ScrollTrigger } from './gsap'
import { LenisContext } from './lenisContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface LenisProviderProps {
  children: ReactNode
}

/**
 * Mounts the site-wide Lenis smooth-scroll instance, driven by GSAP's ticker
 * so it stays in lockstep with every ScrollTrigger-based reveal, and exposes
 * it (via a ref, see lenisContext.ts) so in-page navigation can drive
 * `scrollTo` directly. Skips Lenis entirely under `prefers-reduced-motion`,
 * falling back to native scroll.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const instance = createLenis()
    lenisRef.current = instance

    function syncScrollTrigger() {
      ScrollTrigger.update()
    }

    function raf(time: number) {
      instance.raf(time * 1000)
    }

    instance.on('scroll', syncScrollTrigger)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      instance.destroy()
      lenisRef.current = null
    }
  }, [prefersReducedMotion])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
