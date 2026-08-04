import { useRef } from 'react'
import { useHeroReveal } from '@/animations/useHeroReveal'
import { useParallax } from '@/animations/useParallax'
import { HERO_CONTENT } from '@/constants/hero'
import { HeroContent } from './HeroContent'
import { HeroImage } from './HeroImage'
import { ScrollIndicator } from './ScrollIndicator'

/**
 * The photograph trails the page by 16% of the viewport height over the Hero's
 * single screen of scroll — i.e. it rises at ~84% of scroll speed. Enough for
 * the image to read as sitting behind the copy, small enough that the heading
 * never appears to slide across it. Higher than the mid-page images' default
 * because the Hero spends its whole travel in a single screen of scroll, where
 * a gentler drift would be over before it registered.
 */
const HERO_PARALLAX_AMOUNT = 16

/**
 * The homepage Hero: a full-bleed, full-viewport editorial photograph with
 * overlaid copy and a scroll cue. Owns the GSAP entrance timeline (image,
 * heading, copy, scroll indicator, in sequence) via useHeroReveal, scoped to
 * this section and torn down on unmount. A separate, subtle scroll-scrubbed
 * parallax (useParallax) drifts the photograph as the Hero scrolls past —
 * the brief's flagship "acceptable" parallax example. It uses the `leave`
 * range because the Hero is already on screen at load: the drift is scrubbed
 * from the first pixel of scroll rather than from the section entering view.
 */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)

  useHeroReveal(containerRef)
  useParallax(containerRef, {
    selector: '[data-hero-parallax]',
    amount: HERO_PARALLAX_AMOUNT,
    range: 'leave',
  })

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
