import { BodyText, LargeDisplay, SectionLabel } from '@/components/typography'
import { Container } from '@/components/layout'

export interface HeroContentProps {
  label: string
  heading: string
  subtitle: string
}

/**
 * Editorial copy for the Hero: eyebrow label, the page's single H1, and
 * supporting availability copy. Stacks on mobile; splits into a
 * wordmark/meta row on larger screens. Positioning against the photograph
 * is owned by the parent HeroSection, keeping this purely presentational.
 */
export function HeroContent({ label, heading, subtitle }: HeroContentProps) {
  return (
    <Container className="text-ink-foreground flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <div>
        <SectionLabel data-hero-label className="text-ink-foreground/85 mb-3">
          {label}
        </SectionLabel>
        <LargeDisplay data-hero-heading className="uppercase">
          {heading}
        </LargeDisplay>
      </div>
      <BodyText data-hero-subtitle className="text-ink-foreground/85 max-w-xs lg:mb-1 lg:text-right">
        {subtitle}
      </BodyText>
    </Container>
  )
}
