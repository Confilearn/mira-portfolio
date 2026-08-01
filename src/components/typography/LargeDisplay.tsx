import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type LargeDisplayElement = 'h1' | 'h2' | 'div'

export interface LargeDisplayProps extends ComponentPropsWithoutRef<'h1'> {
  /** Semantic element to render. Defaults to `h1` — reserve for the page's primary headline. */
  as?: LargeDisplayElement
}

/** Hero-scale display type. One per page, typically the hero headline. */
export function LargeDisplay({ as: Tag = 'h1', className, children, ...props }: LargeDisplayProps) {
  return (
    <Tag className={cn('font-display text-display-xl text-balance tracking-tight', className)} {...props}>
      {children}
    </Tag>
  )
}
