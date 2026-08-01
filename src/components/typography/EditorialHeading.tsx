import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type EditorialHeadingElement = 'h1' | 'h2' | 'h3'

export interface EditorialHeadingProps extends ComponentPropsWithoutRef<'h2'> {
  /** Semantic heading level. Defaults to `h2` — pick based on document outline, not visual size. */
  as?: EditorialHeadingElement
}

/** Large serif heading used for primary section titles (Gallery, About, Agency, …). */
export function EditorialHeading({ as: Tag = 'h2', className, children, ...props }: EditorialHeadingProps) {
  return (
    <Tag className={cn('font-display text-display-lg text-balance tracking-tight', className)} {...props}>
      {children}
    </Tag>
  )
}
