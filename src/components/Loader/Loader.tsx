import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useDocumentReady } from '@/hooks/useDocumentReady'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { EASE } from '@/constants/motion'
import { LOADER_WORDMARK, getLoaderTiming } from '@/constants/loader'

export interface LoaderProps {
  /** Called once the loader has fully faded out — the parent unmounts it in response. */
  onFinished: () => void
}

type Phase = 'revealing' | 'holding' | 'waiting' | 'exiting'

/**
 * Full-viewport editorial loading screen shown once, on the initial app
 * load: "MIRA" reveals letter by letter, holds briefly, then fades away to
 * reveal the Hero underneath. Opacity/transform only, per
 * docs/animation-principles.md. Reduced motion collapses the reveal to a
 * single fade (see getLoaderTiming). Purely decorative — aria-hidden, no
 * focus trap — so it can never strand a screen reader or keyboard user.
 */
export function Loader({ onFinished }: LoaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const documentReady = useDocumentReady()
  const [phase, setPhase] = useState<Phase>('revealing')
  const timing = getLoaderTiming(prefersReducedMotion)

  useLockBodyScroll(true)

  // Reveal the wordmark, then hold on it briefly.
  useEffect(() => {
    const revealSeconds =
      timing.letterDuration + timing.letterStagger * (LOADER_WORDMARK.length - 1)
    const timer = setTimeout(() => setPhase('holding'), revealSeconds * 1000)
    return () => clearTimeout(timer)
  }, [timing])

  useEffect(() => {
    if (phase !== 'holding') return
    const timer = setTimeout(() => setPhase('waiting'), timing.holdDuration * 1000)
    return () => clearTimeout(timer)
  }, [phase, timing])

  // Once the hold ends, finish immediately if the Hero is already ready;
  // otherwise wait for it, capped so a slow connection can't stall forever.
  useEffect(() => {
    if (phase !== 'waiting') return
    const delay = documentReady ? 0 : timing.maxReadyWait * 1000
    const timer = setTimeout(() => setPhase('exiting'), delay)
    return () => clearTimeout(timer)
  }, [phase, documentReady, timing])

  useEffect(() => {
    if (phase !== 'exiting') return
    const timer = setTimeout(onFinished, timing.exitDuration * 1000)
    return () => clearTimeout(timer)
  }, [phase, onFinished, timing])

  const wordmarkVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: timing.letterStagger } },
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: timing.letterDuration, ease: EASE.editorial },
    },
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: timing.exitDuration, ease: EASE.editorial }}
      className="bg-ink fixed inset-0 z-[var(--z-loader)] flex items-center justify-center"
    >
      <motion.span
        variants={wordmarkVariants}
        initial="hidden"
        animate="visible"
        className="font-display text-display-lg text-ink-foreground flex uppercase tracking-tight"
      >
        {LOADER_WORDMARK.map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  )
}
