import { ChevronRight } from 'lucide-react'
import { EditorialHeading, SectionLabel } from '@/components/typography'
import { TextButton } from '@/components/buttons'

export interface GalleryHeaderProps {
  label: string
  heading: string
  portfolioLinkLabel: string
  onViewPortfolio: () => void
}

/**
 * Gallery section header: eyebrow label + heading on the left, a "view full
 * portfolio" action on the right (wraps below on narrow screens). Opens the
 * shared Lightbox at the first image — there's no standalone portfolio route
 * yet (see docs/roadmap.md's Version 4), so this reuses what already exists
 * rather than linking somewhere that doesn't exist.
 */
export function GalleryHeader({
  label,
  heading,
  portfolioLinkLabel,
  onViewPortfolio,
}: GalleryHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <SectionLabel data-gallery-label className="mb-4">
          {label}
        </SectionLabel>
        <EditorialHeading id="gallery-heading" data-gallery-heading>
          {heading}
        </EditorialHeading>
      </div>
      <TextButton
        data-gallery-link
        onClick={onViewPortfolio}
        endIcon={<ChevronRight className="size-4" />}
      >
        {portfolioLinkLabel}
      </TextButton>
    </div>
  )
}
