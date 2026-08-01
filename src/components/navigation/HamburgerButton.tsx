import { cn } from '@/lib/utils'

export interface HamburgerButtonProps {
  open: boolean
  onClick: () => void
  className?: string
}

/**
 * Fullscreen-menu trigger. The bar-morph is a small CSS transition (per the
 * project's CSS-for-hover/small-transitions convention) — Framer Motion is
 * reserved for the overlay itself.
 */
export function HamburgerButton({ open, onClick, className }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      className={cn(
        'relative z-[var(--z-toast)] inline-flex h-11 w-11 items-center justify-center text-current',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[currentColor] focus-visible:ring-offset-2',
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex h-3.5 w-5 flex-col justify-between">
        <span
          className={cn(
            'h-px w-full origin-center bg-current transition-transform duration-[var(--duration-normal)] ease-editorial',
            open && 'translate-y-[6.5px] rotate-45',
          )}
        />
        <span
          className={cn(
            'h-px w-full bg-current transition-opacity duration-[var(--duration-fast)] ease-editorial',
            open && 'opacity-0',
          )}
        />
        <span
          className={cn(
            'h-px w-full origin-center bg-current transition-transform duration-[var(--duration-normal)] ease-editorial',
            open && '-translate-y-[6.5px] -rotate-45',
          )}
        />
      </span>
    </button>
  )
}
