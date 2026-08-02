import { BodyText, EditorialHeading, SectionLabel } from '@/components/typography'
import type { ProfileDetail } from '@/types/about'

export interface AboutDetailsProps {
  label: string
  heading: string
  details: ProfileDetail[]
}

/**
 * Professional details list for the About section: eyebrow label, heading,
 * and a semantic description list of profile facts (age, height, nationality,
 * …) separated by thin dividers. Positioning against the portrait is owned
 * by the parent AboutSection.
 */
export function AboutDetails({ label, heading, details }: AboutDetailsProps) {
  return (
    <div>
      <SectionLabel data-about-label className="mb-4">
        {label}
      </SectionLabel>
      <EditorialHeading id="about-heading" data-about-heading className="text-display-md">
        {heading}
      </EditorialHeading>

      <dl className="border-border divide-border mt-8 divide-y border-t">
        {details.map((detail) => (
          <div
            key={detail.label}
            data-about-row
            className="flex items-baseline justify-between gap-4 py-4"
          >
            <BodyText as="dt" size="sm" className="text-muted-foreground">
              {detail.label}
            </BodyText>
            <BodyText as="dd" className="text-right">
              {detail.value}
            </BodyText>
          </div>
        ))}
      </dl>
    </div>
  )
}
