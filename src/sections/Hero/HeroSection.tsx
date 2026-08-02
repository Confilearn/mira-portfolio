import { useRef } from 'react'
import { useHeroReveal } from '@/animations/useHeroReveal'
import { HERO_CONTENT } from '@/constants/hero'
import { HeroContent } from './HeroContent'
import { HeroImage } from './HeroImage'
import { ScrollIndicator } from './ScrollIndicator'

/**
 * The homepage Hero: a full-bleed, full-viewport editorial photograph with
 * overlaid copy and a scroll cue. Owns the GSAP entrance timeline (image,
 * heading, copy, scroll indicator, in sequence) via useHeroReveal, scoped to
 * this section and torn down on unmount.
 */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)

  useHeroReveal(containerRef)

  return (
    <section id="home" ref={containerRef} className="relative h-svh w-full overflow-hidden">
      <HeroImage src={HERO_CONTENT.image.src} alt={HERO_CONTENT.image.alt} />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 pb-8 sm:gap-10 sm:pb-10 lg:pb-12">
        <HeroContent
          label={HERO_CONTENT.label}
          heading={HERO_CONTENT.heading}
          subtitle={HERO_CONTENT.subtitle}
        />
        <ScrollIndicator />
      </div>
    </section>
  )
}
