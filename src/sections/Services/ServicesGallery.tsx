import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/types/services'
import { servicesImageId } from './imageTargets'

export interface ServicesGalleryProps {
  services: ServiceItem[]
  className?: string
}

/**
 * Desktop-only column of category images, stacked to be scrolled past the
 * pinned tab list rather than cross-faded in place. Each figure is a scroll
 * target in its own right: it carries the id its tab links to, and the
 * midpoint it crosses is what hands the active state to that tab (see
 * useServicesScrollSync).
 *
 * Hidden below `lg`, where the same categories are presented as the
 * hover/tap-driven ServicesPortrait crossfade instead — a column this tall
 * has nothing to pin against on a phone. Every figure reserves its aspect
 * ratio up front, so lazily-loaded frames can never shift the scroll
 * positions the triggers were measured against.
 */
export function ServicesGallery({ services, className }: ServicesGalleryProps) {
  return (
    <div data-services-image className={cn('hidden flex-col gap-16 lg:flex', className)}>
      {services.map((service) => (
        <figure
          key={service.id}
          id={servicesImageId(service.id)}
          data-services-scroll-image
          className="relative aspect-4/5 w-full scroll-mt-32 overflow-hidden"
        >
          <img
            src={service.image.src}
            alt={service.image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </figure>
      ))}
    </div>
  )
}
