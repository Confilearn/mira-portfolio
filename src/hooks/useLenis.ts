import { useContext } from 'react'
import { LenisContext } from '@/animations/lenisContext'

/** The active Lenis instance ref (see LenisProvider), or `null` under reduced motion / outside the provider. */
export function useLenis() {
  return useContext(LenisContext)
}
