import { useRef, useState } from 'react'
import { useServicesReveal } from '@/animations/useServicesReveal'
import { useServicesScrollSync } from '@/animations/useServicesScrollSync'
import { Container, Section } from '@/components/layout'
import { SERVICES_CONTENT } from '@/constants/services'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { SERVICES_IMAGE_SELECTOR } from './imageTargets'
import { ServicesGallery } from './ServicesGallery'
import { ServicesList } from './ServicesList'
import { ServicesPortrait } from './ServicesPortrait'

/**
 * Homepage Services: Mira's modelling categories as a numbered list beside
 * an editorial preview, presenting range without competing with the
 * photography.
 *
 * The interaction is breakpoint-dependent. At `lg` and above the list is
 * pinned (CSS sticky, so nothing fights Lenis for the scroll position) while
 * ServicesGallery's stacked images scroll past it, and useServicesScrollSync
 * hands the active state to whichever image holds the viewport midpoint —
 * replaying in reverse on the way back up. Each row also links straight to
 * its image, so the list doubles as in-page navigation. Below `lg` there is
 * nothing to pin against, so the categories stay as the hover/tap-driven
 * ServicesPortrait crossfade, defaulting to the first category.
 *
 * Owns the GSAP ScrollTrigger reveal (portrait, then label/heading, then
 * list rows in sequence) via useServicesReveal, scoped to this section and
 * torn down on unmount.
 */
export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { label, heading, services } = SERVICES_CONTENT
  const [activeIndex, setActiveIndex] = useState(0)
  const isDesktop = useBreakpoint('lg')

  useServicesReveal(containerRef)
  useServicesScrollSync(containerRef, {
    selector: SERVICES_IMAGE_SELECTOR,
    onActiveChange: setActiveIndex,
    enabled: isDesktop,
  })

  return (
    <Section id="services" spacing="lg" aria-labelledby="services-heading">
      <Container width="content">
        <div
          ref={containerRef}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
        >
          <ServicesList
            label={label}
            heading={heading}
            services={services}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
            linked={isDesktop}
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <ServicesPortrait
            images={services.map((service) => service.image)}
            activeIndex={activeIndex}
            className="mx-auto max-w-sm lg:hidden"
          />
          <ServicesGallery services={services} />
        </div>
      </Container>
    </Section>
  )
}
