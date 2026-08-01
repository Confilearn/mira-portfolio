import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type SectionLabelElement = 'p' | 'span' | 'div'

export interface SectionLabelProps extends ComponentPropsWithoutRef<'p'> {
  /**
   * Semantic element. Defaults to `p` — this is a decorative eyebrow/kicker,
   * not a heading, so it should never carry an `h1`–`h6` role.
   */
  as?: SectionLabelElement
}

/** Small uppercase eyebrow label that introduces a heading. */
export function SectionLabel({ as: Tag = 'p', className, children, ...props }: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        'text-label tracking-label text-muted-foreground font-sans uppercase',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
