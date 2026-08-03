import { cn } from '@/lib/utils'
import { Divider } from '@/components/layout'
import type { SectionSpacing } from '@/types/design-system'

const SPACING_CLASSES: Record<SectionSpacing, string> = {
  null: '',
  sm: 'my-section-sm',
  md: 'my-section-md',
  lg: 'my-section-lg',
}

export interface SectionDividerProps {
  /** Defaults to `md`. */
  spacing?: SectionSpacing
  className?: string
}

/** Simple rhythm divider between sections. No decorative graphics. */
export function SectionDivider({ spacing = 'md', className }: SectionDividerProps) {
  return <Divider className={cn(SPACING_CLASSES[spacing], className)} />
}
