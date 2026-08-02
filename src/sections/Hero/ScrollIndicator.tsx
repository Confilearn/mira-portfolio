import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

export interface ScrollIndicatorProps {
  className?: string
}

/**
 * Minimal cue hinting there's more below the Hero: a short line whose fill
 * travels top-to-bottom on a slow loop. CSS-driven (a small, purely
 * decorative loop, not storytelling) and disabled under reduced motion,
 * leaving a static line in place.
 */
export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      data-hero-scroll
      aria-hidden="true"
      className={cn('text-ink-foreground/80 flex flex-col items-center gap-3', className)}
    >
      <span className="text-label tracking-label font-sans uppercase">Scroll</span>
      <span className="bg-ink-foreground/25 relative h-10 w-px overflow-hidden">
        <span
          className={cn(
            'bg-ink-foreground absolute inset-x-0 top-0 h-1/2',
            !prefersReducedMotion && 'animate-hero-scroll-line',
          )}
        />
      </span>
    </div>
  )
}
