import { EditorialHeading, SectionLabel } from '@/components/typography'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/types/services'

export interface ServicesListProps {
  label: string
  heading: string
  services: ServiceItem[]
  activeIndex: number
  onActiveChange: (index: number) => void
}

/**
 * Numbered list of Mira's modelling categories: eyebrow label, heading, and
 * a semantic ordered list where each row is a focusable button. Hovering
 * (desktop) or focusing/tapping (keyboard, touch) a row sets it active,
 * driving the ServicesPortrait crossfade next to it and picking up a
 * persistent underline + solid text color rather than only on :hover, so the
 * currently previewed category stays legible. Positioning against the
 * portrait is owned by the parent ServicesSection.
 */
export function ServicesList({
  label,
  heading,
  services,
  activeIndex,
  onActiveChange,
}: ServicesListProps) {
  return (
    <div>
      <SectionLabel data-services-label className="mb-4">
        {label}
      </SectionLabel>
      <EditorialHeading id="services-heading" data-services-heading className="text-display-md">
        {heading}
      </EditorialHeading>

      <ol className="border-border mt-8 border-t">
        {services.map((service, index) => {
          const active = index === activeIndex
          return (
            <li key={service.id} data-services-item className="border-border border-b">
              <button
                type="button"
                onMouseEnter={() => onActiveChange(index)}
                onFocus={() => onActiveChange(index)}
                onClick={() => onActiveChange(index)}
                aria-current={active ? 'true' : undefined}
                className="group focus-visible:ring-ring focus-visible:ring-offset-background flex w-full items-baseline gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span
                  className={cn(
                    'text-label font-sans transition-colors duration-[var(--duration-fast)] ease-editorial',
                    active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'font-display text-heading-sm relative transition-colors duration-[var(--duration-fast)] ease-editorial',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground',
                  )}
                >
                  {service.name}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current transition-transform duration-[var(--duration-normal)] ease-editorial',
                      active
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100',
                    )}
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
