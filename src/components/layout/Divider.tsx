import { cn } from '@/lib/utils'

export interface DividerProps {
  /** Defaults to `horizontal`. */
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/** Plain hairline rule. No decorative graphics, per docs/design-principles.md. */
export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div role="separator" aria-orientation="vertical" className={cn('bg-border w-px self-stretch', className)} />
    )
  }

  return <hr className={cn('border-border border-t', className)} />
}
