import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type BodyTextElement = 'p' | 'span' | 'div'
type BodyTextSize = 'lg' | 'base' | 'sm'

const SIZE_CLASSES: Record<BodyTextSize, string> = {
  lg: 'text-body-lg',
  base: 'text-body',
  sm: 'text-body-sm',
}

export interface BodyTextProps extends ComponentPropsWithoutRef<'p'> {
  /** Semantic element. Defaults to `p`. */
  as?: BodyTextElement
  /** Type scale step. Defaults to `base`. */
  size?: BodyTextSize
}

/** Reusable paragraph component that keeps body copy on the shared type scale. */
export function BodyText({ as: Tag = 'p', size = 'base', className, children, ...props }: BodyTextProps) {
  return (
    <Tag className={cn('font-sans', SIZE_CLASSES[size], className)} {...props}>
      {children}
    </Tag>
  )
}
