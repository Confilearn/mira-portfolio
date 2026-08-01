import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ExternalLinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'target' | 'rel'> {
  children: ReactNode
}

/** Anchor that safely opens in a new tab. Use for links leaving the site (agency, social, press). */
export function ExternalLink({ href, className, children, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:underline',
        className,
      )}
      {...props}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
