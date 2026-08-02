import { useRef } from 'react'
import { useContactReveal } from '@/animations/useContactReveal'
import { Container, Section } from '@/components/layout'
import { EditorialHeading, SectionLabel } from '@/components/typography'
import { ContactLink } from '@/components/utility'
import { CONTACT_CONTENT } from '@/constants/contact'
import { ContactSheetStrip } from './ContactSheetStrip'

/**
 * Homepage Contact: simple, professional contact methods rather than a
 * booking form. A light "contact sheet" block (eyebrow, heading, thumbnail
 * filmstrip) is followed by a full-bleed dark CTA block naming Instagram,
 * WhatsApp and the agency as the ways to get in touch. Owns the GSAP
 * ScrollTrigger reveal for both blocks via useContactReveal, scoped to this
 * section and torn down on unmount.
 */
export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { sheet, cta } = CONTACT_CONTENT

  useContactReveal(containerRef)

  return (
    <div ref={containerRef}>
      <Section id="contact" spacing="lg" aria-labelledby="contact-sheet-heading">
        <Container width="content">
          <div data-contact-sheet>
            <SectionLabel data-contact-label className="mb-4">
              {sheet.label}
            </SectionLabel>
            <EditorialHeading
              id="contact-sheet-heading"
              data-contact-heading
              className="text-display-md"
            >
              {sheet.heading}
            </EditorialHeading>
            <ContactSheetStrip images={sheet.images} className="mt-8 lg:mt-10" />
          </div>
        </Container>
      </Section>

      <Section tone="ink" spacing="md" aria-labelledby="contact-cta-heading">
        <Container width="narrow">
          <div data-contact-cta className="flex flex-col items-center gap-6 text-center">
            <EditorialHeading id="contact-cta-heading" data-contact-cta-heading>
              {cta.heading}
            </EditorialHeading>

            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
              {cta.links.map((link) => (
                <li key={link.id} data-contact-cta-link>
                  <ContactLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </div>
  )
}
