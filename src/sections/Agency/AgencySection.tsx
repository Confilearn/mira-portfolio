import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useAgencyReveal } from '@/animations/useAgencyReveal'
import { Container, Section } from '@/components/layout'
import { BodyText, EditorialHeading, SectionLabel } from '@/components/typography'
import { buttonVariants } from '@/components/buttons'
import { ExternalLink } from '@/components/utility'
import { AGENCY_CONTENT } from '@/constants/agency'
import { cn } from '@/lib/utils'

/**
 * Homepage Agency: a full-bleed dark section that builds trust by naming
 * Mira's representation (Zane Models) without competing with the
 * photography-led sections around it — quiet copy, no imagery, one CTA.
 * Owns the GSAP ScrollTrigger fade-in (label, heading, paragraph, CTA in
 * sequence) via useAgencyReveal, scoped to this section and torn down on
 * unmount.
 */
export function AgencySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { label, heading, paragraph, cta } = AGENCY_CONTENT

  useAgencyReveal(containerRef)

  return (
    <Section id="agency" tone="ink" spacing="md" aria-labelledby="agency-heading">
      <Container width="narrow">
        <div ref={containerRef} className="flex flex-col items-center gap-6 text-center">
          <SectionLabel data-agency-label className="text-accent">
            {label}
          </SectionLabel>

          <EditorialHeading id="agency-heading" data-agency-heading>
            {heading}
          </EditorialHeading>

          <BodyText data-agency-paragraph size="lg" className="text-ink-foreground/80 max-w-md">
            {paragraph}
          </BodyText>

          <ExternalLink
            data-agency-cta
            href={cta.href}
            className={cn(
              buttonVariants({ intent: 'secondary', size: 'lg' }),
              'group mt-4 h-auto border-ink-foreground/70 px-10 py-4',
              'text-label tracking-label text-ink-foreground uppercase no-underline',
              'transition-[background-color,border-color,color] duration-[var(--duration-normal)] ease-editorial',
              'hover:border-ink-foreground hover:bg-ink-foreground hover:text-ink hover:no-underline',
              'focus-visible:ring-ink-foreground focus-visible:ring-offset-ink',
            )}
          >
            {cta.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-normal)] ease-editorial group-hover:translate-x-1.5"
            />
          </ExternalLink>
        </div>
      </Container>
    </Section>
  )
}
