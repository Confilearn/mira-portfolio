import type { ElementType } from 'react'
import { cn } from '@/lib/utils'
import { ExternalLink } from './ExternalLink'
import { IconWrapper } from './IconWrapper'

export interface SocialLinkProps {
  href: string
  icon: ElementType
  /** Accessible name for the link (e.g. "Instagram"), since the link is icon-only. */
  label: string
  className?: string
}

/** Icon-only link to a social or contact profile (Instagram, WhatsApp, agency, …). */
export function SocialLink({ href, icon, label, className }: SocialLinkProps) {
  return (
    <ExternalLink
      href={href}
      className={cn(
        'text-foreground hover:text-accent-hover inline-flex no-underline hover:no-underline',
        className,
      )}
    >
      <IconWrapper icon={icon} label={label} />
    </ExternalLink>
  )
}
