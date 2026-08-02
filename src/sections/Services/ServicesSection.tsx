import { useRef, useState } from 'react'
import { useServicesReveal } from '@/animations/useServicesReveal'
import { Container, Section } from '@/components/layout'
import { SERVICES_CONTENT } from '@/constants/services'
import { ServicesList } from './ServicesList'
import { ServicesPortrait } from './ServicesPortrait'

/**
 * Homepage Services: Mira's modelling categories as a numbered list beside
 * an interactive editorial preview, presenting range without competing with
 * the photography. Hovering (desktop) or focusing/tapping (keyboard, touch)
 * a category crossfades its image in next to the list, defaulting to the
 * first category. Owns the GSAP ScrollTrigger reveal (portrait, then
 * label/heading, then list rows in sequence) via useServicesReveal, scoped
 * to this section and torn down on unmount.
 */
export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { label, heading, services } = SERVICES_CONTENT
  const [activeIndex, setActiveIndex] = useState(0)

  useServicesReveal(containerRef)

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
          />
          <ServicesPortrait
            images={services.map((service) => service.image)}
            activeIndex={activeIndex}
            className="mx-auto max-w-sm lg:max-w-none"
          />
        </div>
      </Container>
    </Section>
  )
}
