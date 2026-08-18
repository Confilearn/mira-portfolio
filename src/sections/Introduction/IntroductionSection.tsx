import { useRef } from 'react'
import { useIntroductionReveal } from '@/animations/useIntroductionReveal'
import { useParallax } from '@/animations/useParallax'
import { useScrollSpeed } from '@/animations/useScrollSpeed'
import { Container, Section } from '@/components/layout'
import { INTRODUCTION_CONTENT } from '@/constants/introduction'
import { IntroductionContent } from './IntroductionContent'
import { IntroductionPortrait } from './IntroductionPortrait'

/**
 * Editorial Introduction: the calm, text-led section directly beneath the
 * Hero that establishes Mira's story. Owns the GSAP ScrollTrigger reveal
 * (label, heading, paragraph, portrait, in sequence) via
 * useIntroductionReveal, scoped to this section and torn down on unmount. A
 * separate, subtle scroll-scrubbed parallax (useParallax) drifts the
 * portrait itself — the entrance targets the image's wrapper, so the two
 * never touch the same element. That wrapper is also the parallax's scroll
 * trigger rather than this section, so the drift starts when the portrait
 * enters the viewport, not when the copy above it does. The copy block
 * itself is slowed to 80% of the page scroll speed via useScrollSpeed, which
 * drifts only its wrapper — the entrance tweens target the label, heading
 * and paragraph inside it, so again the two never share an element.
 */
export function IntroductionSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useIntroductionReveal(containerRef)
  useParallax(containerRef, {
    selector: '[data-intro-image] img',
    trigger: '[data-intro-image]',
  })
  useScrollSpeed(containerRef, { selector: '[data-intro-copy]', speed: 0.8 })

  return (
    <Section spacing="lg" aria-labelledby="introduction-heading">
      <Container width="content">
        <div ref={containerRef} className="flex flex-col gap-12 lg:gap-16">
          <IntroductionContent
            label={INTRODUCTION_CONTENT.label}
            heading={INTRODUCTION_CONTENT.heading}
            paragraph={INTRODUCTION_CONTENT.paragraph}
          />
          <IntroductionPortrait
            src={INTRODUCTION_CONTENT.image.src}
            alt={INTRODUCTION_CONTENT.image.alt}
          />
        </div>
      </Container>
    </Section>
  )
}
