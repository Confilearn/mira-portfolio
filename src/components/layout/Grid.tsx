import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { GAP_CLASSES, type Gap } from './shared'

type GridColumns = 1 | 2 | 3 | 4 | 6 | 12

/** Each column count ships a sensible responsive breakdown rather than a flat grid-cols-N. */
const COLUMNS_CLASSES: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-12',
}

export interface GridProps extends ComponentPropsWithoutRef<'div'> {
  /** Column count at the largest breakpoint; recomposes at smaller ones. Defaults to `3`. */
  columns?: GridColumns
  /** Gap between cells, from the shared Gap scale. Defaults to `md`. */
  gap?: Gap
}

/** Responsive CSS grid primitive for editorial galleries and card layouts. */
export function Grid({ columns = 3, gap = 'md', className, children, ...props }: GridProps) {
  return (
    <div className={cn('grid', COLUMNS_CLASSES[columns], GAP_CLASSES[gap], className)} {...props}>
      {children}
    </div>
  )
}
