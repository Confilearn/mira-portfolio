import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { GAP_CLASSES, type Gap } from './shared'

type StackDirection = 'row' | 'col'
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

const DIRECTION_CLASSES: Record<StackDirection, string> = {
  row: 'flex-row',
  col: 'flex-col',
}

const ALIGN_CLASSES: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const JUSTIFY_CLASSES: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  /** Flex direction. Defaults to `col`. */
  direction?: StackDirection
  align?: StackAlign
  justify?: StackJustify
  /** Gap between children, from the shared Gap scale. Defaults to `sm`. */
  gap?: Gap
  wrap?: boolean
}

/**
 * Flex layout primitive with a consistent, token-driven gap between children.
 * Always renders a `div` — for a semantic list, wrap a `ul`/`ol` around it instead.
 */
export function Stack({
  direction = 'col',
  align,
  justify,
  gap = 'sm',
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        DIRECTION_CLASSES[direction],
        align && ALIGN_CLASSES[align],
        justify && JUSTIFY_CLASSES[justify],
        wrap && 'flex-wrap',
        GAP_CLASSES[gap],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
