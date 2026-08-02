import { useRef } from 'react'
import { useGalleryReveal } from '@/animations/useGalleryReveal'
import { Container, Section } from '@/components/layout'
import { GalleryGrid, Lightbox } from '@/components/gallery'
import { useLightbox } from '@/hooks/useLightbox'
import { GALLERY_CONTENT } from '@/constants/gallery'
import { GalleryHeader } from './GalleryHeader'

/**
 * Homepage Gallery: an editorial, curated image grid (not a uniform grid —
 * see GalleryGrid) showcasing Mira's modelling work, with a shared,
 * production-ready Lightbox for fullscreen viewing. Owns the GSAP
 * ScrollTrigger stagger reveal via useGalleryReveal and the lightbox's
 * open/active-index state via useLightbox.
 */
export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { images, label, heading, portfolioLinkLabel } = GALLERY_CONTENT
  const { activeIndex, isOpen, open, close, next, previous } = useLightbox(images.length)

  useGalleryReveal(containerRef)

  return (
    <Section id="gallery" spacing="lg" aria-labelledby="gallery-heading">
      <Container width="content">
        <div ref={containerRef}>
          <GalleryHeader
            label={label}
            heading={heading}
            portfolioLinkLabel={portfolioLinkLabel}
            onViewPortfolio={() => open(0)}
          />
          <GalleryGrid images={images} onImageOpen={open} className="mt-10 lg:mt-14" />
        </div>
      </Container>

      <Lightbox
        images={images}
        activeIndex={activeIndex ?? 0}
        open={isOpen}
        onClose={close}
        onNext={next}
        onPrevious={previous}
      />
    </Section>
  )
}
