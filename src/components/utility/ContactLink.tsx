import { cn } from '@/lib/utils'
import { ExternalLink } from './ExternalLink'

export interface ContactLinkProps {
  href: string
  label: string
  className?: string
}

/**
 * Text-based external link for a professional contact channel (Instagram,
 * WhatsApp, agency website), permanently underlined in the accent gold per
 * the approved design. Hover/focus subtly dims opacity rather than toggling
 * the underline.
 */
export function ContactLink({ href, label, className }: ContactLinkProps) {
  return (
    <ExternalLink
      href={href}
      className={cn(
        'decoration-accent inline-block font-sans text-body underline underline-offset-4 transition-opacity duration-[var(--duration-fast)] ease-editorial hover:opacity-70 focus-visible:opacity-70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
        className,
      )}
    >
      {label}
    </ExternalLink>
  )
}
