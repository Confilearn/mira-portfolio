import { BodyText, EditorialHeading, SectionLabel } from '@/components/typography'

export interface IntroductionContentProps {
  label: string
  heading: string
  paragraph: string
}

/**
 * Editorial copy introducing Mira: eyebrow label, a long-form serif
 * statement functioning as the section's headline, and a supporting
 * paragraph with grounding biographical detail. Positioning against the
 * portrait is owned by the parent IntroductionSection.
 */
export function IntroductionContent({ label, heading, paragraph }: IntroductionContentProps) {
  return (
    <div className="max-w-3xl">
      <SectionLabel data-intro-label className="mb-4">
        {label}
      </SectionLabel>
      <EditorialHeading id="introduction-heading" data-intro-heading className="text-display-md">
        {heading}
      </EditorialHeading>
      <BodyText data-intro-paragraph size="lg" className="text-muted-foreground mt-6 max-w-xl">
        {paragraph}
      </BodyText>
    </div>
  )
}
