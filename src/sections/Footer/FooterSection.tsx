import { useRef } from 'react'
import { useFooterReveal } from '@/animations/useFooterReveal'
import { Container, Divider, Section } from '@/components/layout'
import { Caption } from '@/components/typography'
import { ExternalLink } from '@/components/utility'
import { FOOTER_CONTENT } from '@/constants/footer'

/**
 * Site-wide footer: the quiet closing bar beneath the Contact section's dark
 * CTA (which already carries the editorial "Let's Create Something
 * Timeless" statement and social/agency links). Continues the same ink tone
 * so the two blocks read as one uninterrupted dark ending, separated only by
 * a hairline rule. Owns the GSAP ScrollTrigger fade-in via useFooterReveal,
 * scoped to this section and torn down on unmount.
 */
export function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { copyright, credit } = FOOTER_CONTENT

  useFooterReveal(containerRef)

  return (
    <Section as="footer" tone="ink" spacing="sm" aria-label="Site footer">
      <Container width="content">
        <div ref={containerRef}>
          <Divider className="border-ink-foreground/15" />

          <div className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-baseline sm:justify-between sm:text-left">
            <Caption data-footer-copyright className="text-ink-foreground/60">
              {copyright}
            </Caption>

            <ExternalLink
              data-footer-credit
              href={credit.href}
              className="text-caption text-ink-foreground/60 rounded-sm underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-editorial hover:text-ink-foreground focus-visible:text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Designed &amp; Developed by {credit.label}
            </ExternalLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
