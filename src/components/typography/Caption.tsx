import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type CaptionElement = 'span' | 'p' | 'figcaption'

export interface CaptionProps extends ComponentPropsWithoutRef<'span'> {
  /** Semantic element. Defaults to `span`; use `figcaption` inside a `<figure>`. */
  as?: CaptionElement
}

/** Small muted text for image captions and photo credits. */
export function Caption({ as: Tag = 'span', className, children, ...props }: CaptionProps) {
  return (
    <Tag className={cn('text-caption text-muted-foreground font-sans', className)} {...props}>
      {children}
    </Tag>
  )
}
