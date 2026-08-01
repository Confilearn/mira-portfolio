import { cn } from '@/lib/utils'

type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type SpacerAxis = 'vertical' | 'horizontal'

const SIZE_CLASSES: Record<SpacerAxis, Record<SpacerSize, string>> = {
  vertical: { xs: 'h-2', sm: 'h-4', md: 'h-8', lg: 'h-12', xl: 'h-16', '2xl': 'h-24' },
  horizontal: { xs: 'w-2', sm: 'w-4', md: 'w-8', lg: 'w-12', xl: 'w-16', '2xl': 'w-24' },
}

export interface SpacerProps {
  /** Defaults to `md`. */
  size?: SpacerSize
  /** Defaults to `vertical`. */
  axis?: SpacerAxis
  className?: string
}

/** Empty, decorative spacing element for rhythm that gap/margin utilities can't express cleanly. */
export function Spacer({ size = 'md', axis = 'vertical', className }: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('shrink-0', axis === 'horizontal' && 'inline-block', SIZE_CLASSES[axis][size], className)}
    />
  )
}
