import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import type { ContainerWidth } from '@/types/design-system'

const WIDTH_CLASSES: Record<ContainerWidth, string> = {
  narrow: 'max-w-narrow',
  content: 'max-w-content',
  wide: 'max-w-wide',
  full: 'max-w-none',
}

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'div' | 'section' | 'article'
  /** Max-width variant. Defaults to `content`, the standard editorial measure. */
  width?: ContainerWidth
}

/** Centers content and applies consistent responsive horizontal padding. */
export function Container({
  as: Tag = 'div',
  width = 'content',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-6 sm:px-8 lg:px-12', WIDTH_CLASSES[width], className)} {...props}>
      {children}
    </Tag>
  )
}
