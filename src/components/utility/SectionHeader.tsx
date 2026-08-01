import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SectionLabel, EditorialHeading, BodyText, type EditorialHeadingProps } from '@/components/typography'

export interface SectionHeaderProps {
  label?: ReactNode
  heading: ReactNode
  headingAs?: EditorialHeadingProps['as']
  description?: ReactNode
  /** Defaults to `left`. */
  align?: 'left' | 'center'
  className?: string
}

/** The recurring "label + heading + intro copy" pattern used to open a section. */
export function SectionHeader({ label, heading, headingAs, description, align = 'left', className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center', className)}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <EditorialHeading as={headingAs}>{heading}</EditorialHeading>
      {description && (
        <BodyText size="lg" className="text-muted-foreground max-w-prose">
          {description}
        </BodyText>
      )}
    </div>
  )
}
