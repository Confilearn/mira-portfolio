import { useRef } from 'react'
import { useAboutReveal } from '@/animations/useAboutReveal'
import { useParallax } from '@/animations/useParallax'
import { Container, Section } from '@/components/layout'
import { ABOUT_CONTENT } from '@/constants/about'
import { AboutPortrait } from './AboutPortrait'
import { AboutDetails } from './AboutDetails'

/**
 * Homepage About: an editorial runway image paired with Mira's professional
 * details (age, height, nationality, …), reinforcing credibility. Owns the
 * GSAP ScrollTrigger reveal (image, then label/heading, then detail rows in
 * sequence) via useAboutReveal, scoped to this section and torn down on
 * unmount. A separate, subtle scroll-scrubbed parallax (useParallax) drifts
 * the runway portrait itself — the entrance targets the image's wrapper, so
 * the two never touch the same element.
 */
export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { label, heading, image, details } = ABOUT_CONTENT

  useAboutReveal(containerRef)
  useParallax(containerRef, { selector: '[data-about-image] img' })

  return (
    <Section id="about" spacing="lg" aria-labelledby="about-heading">
      <Container width="content">
        <div ref={containerRef} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AboutPortrait src={image.src} alt={image.alt} className="mx-auto max-w-sm lg:max-w-none" />
          <AboutDetails label={label} heading={heading} details={details} />
        </div>
      </Container>
    </Section>
  )
}
