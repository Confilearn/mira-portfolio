import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/constants/site'

export interface LogoProps {
  className?: string
}

/** Wordmark linking back to the homepage. Inherits its color from the surrounding navbar tone. */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        'text-label tracking-label font-sans font-medium text-current uppercase',
        'transition-opacity duration-[var(--duration-fast)] ease-editorial hover:opacity-70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[currentColor] focus-visible:ring-offset-2',
        className,
      )}
    >
      {SITE_NAME}
    </Link>
  )
}
