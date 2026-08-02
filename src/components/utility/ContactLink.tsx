import { cn } from '@/lib/utils'
import { ExternalLink } from './ExternalLink'

export interface ContactLinkProps {
  href: string
  label: string
  className?: string
}

/**
 * Text-based external link for a professional contact channel (Instagram,
 * WhatsApp, agency website). An underline sweeps in on hover/focus using
 * `currentColor`, so it reads correctly on both light and dark section tones
 * without a separate variant.
 */
export function ContactLink({ href, label, className }: ContactLinkProps) {
  return (
    <ExternalLink
      href={href}
      className={cn(
        'group relative inline-block font-sans text-body no-underline hover:no-underline',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
        className,
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-normal)] ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </ExternalLink>
  )
}
