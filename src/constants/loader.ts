/**
 * Editorial loading-screen timing and dev/prod behaviour — the single source
 * of truth so no component hardcodes a duration (see components/Loader).
 * Mirrors the fast/normal timing bands in docs/animation-principles.md.
 */

/** "MIRA", revealed one letter at a time. */
export const LOADER_WORDMARK = ['M', 'I', 'R', 'A'] as const

/** How long each letter takes to fade/rise in. */
const LETTER_DURATION = 0.32
/** Delay before the next letter starts revealing. */
const LETTER_STAGGER = 0.09
/** Pause after "MIRA" is fully revealed, before the loader starts fading out. */
const HOLD_DURATION = 0.35
/** Loader fade-out, revealing the Hero underneath. */
const EXIT_DURATION = 0.5
/** Reduced-motion path: a single fade in, in place of the per-letter reveal. */
const REDUCED_FADE_IN_DURATION = 0.4
const REDUCED_HOLD_DURATION = 0.3
const REDUCED_EXIT_DURATION = 0.4

/**
 * Longest the loader will wait past its hold for the Hero image to finish
 * loading, so a slow connection can never block it indefinitely.
 */
const MAX_READY_WAIT = 1.5

/**
 * Development-only escape hatches for faster iteration — never consulted in
 * production (see getLoaderTiming), where the full editorial sequence always
 * plays at full length.
 */
export const LOADER_DEV_CONFIG = {
  /** Set to `false` to skip the loader entirely while running `npm run dev`. */
  enabled: true,
  /** Scales every duration below while running `npm run dev` (1 = full length). */
  speedMultiplier: 0.35,
} as const

export interface LoaderTiming {
  letterDuration: number
  letterStagger: number
  holdDuration: number
  exitDuration: number
  maxReadyWait: number
}

/**
 * Resolves the durations (in seconds) the loader animates with. Reduced
 * motion collapses the per-letter stagger to a single simultaneous fade by
 * zeroing `letterStagger` — the reveal timeline math in Loader stays
 * identical either way. The dev speed multiplier only ever applies in
 * `npm run dev`; production always gets the full-length sequence.
 */
export function getLoaderTiming(prefersReducedMotion: boolean): LoaderTiming {
  const speed = import.meta.env.DEV ? LOADER_DEV_CONFIG.speedMultiplier : 1

  const base = prefersReducedMotion
    ? {
        letterDuration: REDUCED_FADE_IN_DURATION,
        letterStagger: 0,
        holdDuration: REDUCED_HOLD_DURATION,
        exitDuration: REDUCED_EXIT_DURATION,
        maxReadyWait: MAX_READY_WAIT,
      }
    : {
        letterDuration: LETTER_DURATION,
        letterStagger: LETTER_STAGGER,
        holdDuration: HOLD_DURATION,
        exitDuration: EXIT_DURATION,
        maxReadyWait: MAX_READY_WAIT,
      }

  return {
    letterDuration: base.letterDuration * speed,
    letterStagger: base.letterStagger * speed,
    holdDuration: base.holdDuration * speed,
    exitDuration: base.exitDuration * speed,
    maxReadyWait: base.maxReadyWait * speed,
  }
}
