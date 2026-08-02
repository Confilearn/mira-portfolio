import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import type { SectionSpacing, Tone } from '@/types/design-system'

const SPACING_CLASSES: Record<SectionSpacing, string> = {
  sm: 'py-section-sm',
  md: 'py-section-md',
  lg: 'py-section-lg',
}

const TONE_CLASSES: Record<Tone, string> = {
  light: 'bg-background text-foreground',
  ink: 'bg-ink text-ink-foreground',
}

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  as?: 'section' | 'div' | 'footer'
  /** Vertical rhythm. Defaults to `md`. */
  spacing?: SectionSpacing
  /** Light (default) or inverse dark surface. */
  tone?: Tone
}

/** Standard vertical-rhythm wrapper. Compose with Container for horizontal measure. */
export function Section({
  as: Tag = 'section',
  spacing = 'md',
  tone = 'light',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(SPACING_CLASSES[spacing], TONE_CLASSES[tone], className)} {...props}>
      {children}
    </Tag>
  )
}
