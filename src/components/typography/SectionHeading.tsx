import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingElement = 'h2' | 'h3' | 'h4'

export interface SectionHeadingProps extends ComponentPropsWithoutRef<'h3'> {
  /** Semantic heading level. Defaults to `h3` — for subsection titles nested under an EditorialHeading. */
  as?: SectionHeadingElement
}

/** Mid-size serif heading for subsection titles nested inside a larger section. */
export function SectionHeading({ as: Tag = 'h3', className, children, ...props }: SectionHeadingProps) {
  return (
    <Tag className={cn('font-display text-heading-lg text-balance', className)} {...props}>
      {children}
    </Tag>
  )
}
