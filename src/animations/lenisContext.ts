import { createContext } from 'react'
import type { RefObject } from 'react'
import type Lenis from 'lenis'

/**
 * Ref (not state) on purpose: the Lenis instance is an imperative handle for
 * `scrollTo`, read at click-time by consumers — not a value anything needs
 * to re-render on. Populating it from a ref inside LenisProvider's effect
 * avoids a synchronous setState-in-effect render cascade for a value with no
 * render-time reader.
 */
export const LenisContext = createContext<RefObject<Lenis | null> | null>(null)
