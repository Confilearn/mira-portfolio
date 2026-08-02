import { EditorialHeading, SectionLabel } from '@/components/typography'
import type { ServiceItem } from '@/types/services'

export interface ServicesListProps {
  label: string
  heading: string
  services: ServiceItem[]
}

/**
 * Numbered list of Mira's modelling categories: eyebrow label, heading, and
 * a semantic ordered list where each row is a focusable button so hover and
 * keyboard-focus reveal the same underline/opacity treatment. Positioning
 * against the portrait is owned by the parent ServicesSection.
 */
export function ServicesList({ label, heading, services }: ServicesListProps) {
  return (
    <div>
      <SectionLabel data-services-label className="mb-4">
        {label}
      </SectionLabel>
      <EditorialHeading id="services-heading" data-services-heading className="text-display-md">
        {heading}
      </EditorialHeading>

      <ol className="border-border mt-8 border-t">
        {services.map((service, index) => (
          <li key={service.id} data-services-item className="border-border border-b">
            <button
              type="button"
              className="group focus-visible:ring-ring focus-visible:ring-offset-background flex w-full items-baseline gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span className="text-label text-muted-foreground font-sans">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-heading-sm text-muted-foreground relative transition-colors duration-[var(--duration-fast)] ease-editorial group-hover:text-foreground group-focus-visible:text-foreground">
                {service.name}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-normal)] ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
