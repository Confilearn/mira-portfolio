import { useSectionLinkClick } from '@/hooks/useSectionLinkClick'
import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/constants/site'

export interface LogoProps {
  className?: string
}

/** Wordmark linking back to the top of the page. Inherits its color from the surrounding navbar tone. */
export function Logo({ className }: LogoProps) {
  const handleClick = useSectionLinkClick('#home')

  return (
    <a
      href="#home"
      onClick={handleClick}
      className={cn(
        'text-label tracking-label font-sans font-medium text-current uppercase',
        'transition-opacity duration-[var(--duration-fast)] ease-editorial hover:opacity-70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[currentColor] focus-visible:ring-offset-2',
        className,
      )}
    >
      {SITE_NAME}
    </a>
  )
}
