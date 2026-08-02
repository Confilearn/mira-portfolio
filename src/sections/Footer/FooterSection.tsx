import { useRef } from 'react'
import { useFooterReveal } from '@/animations/useFooterReveal'
import { Container, Section } from '@/components/layout'
import { Caption } from '@/components/typography'
import { ExternalLink } from '@/components/utility'
import { FOOTER_CONTENT } from '@/constants/footer'

/**
 * Site-wide footer: a quiet, light closing bar — a separate section from
 * Contact's dark CTA above it, not a continuation of it. Owns the GSAP
 * ScrollTrigger fade-in via useFooterReveal, scoped to this section and torn
 * down on unmount.
 */
export function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { copyright, credit } = FOOTER_CONTENT

  useFooterReveal(containerRef)

  return (
    <Section as="footer" className="py-6" aria-label="Site footer">
      <Container width="content">
        <div
          ref={containerRef}
          className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
        >
          <Caption data-footer-copyright>{copyright}</Caption>

          <ExternalLink
            data-footer-credit
            href={credit.href}
            className="text-caption text-muted-foreground rounded-sm underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-editorial hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Designed &amp; Developed by {credit.label}
          </ExternalLink>
        </div>
      </Container>
    </Section>
  )
}
