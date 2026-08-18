import type { MouseEvent } from 'react'
import { EditorialHeading, SectionLabel } from '@/components/typography'
import { useLenis } from '@/hooks/useLenis'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { NAV_SCROLL_OFFSET } from '@/hooks/useSectionLinkClick'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/types/services'
import { servicesImageId } from './imageTargets'

export interface ServicesListProps {
  label: string
  heading: string
  services: ServiceItem[]
  activeIndex: number
  onActiveChange: (index: number) => void
  /**
   * Desktop scroll-linked mode: rows become in-page links to their image in
   * ServicesGallery, and the active state is owned by scroll position rather
   * than by hover. Below `lg` the rows stay hover/tap-driven buttons, since
   * the images they would link to are not rendered there.
   */
  linked?: boolean
  className?: string
}

const ROW_CLASSES =
  'group focus-visible:ring-ring focus-visible:ring-offset-background flex w-full items-baseline gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

/**
 * Numbered list of Mira's modelling categories: eyebrow label, heading, and
 * a semantic ordered list where each row is a focusable control. Below `lg`,
 * hovering or focusing/tapping a row sets it active, driving the
 * ServicesPortrait crossfade next to it. At `lg` and above the list is
 * pinned beside the scrolling ServicesGallery: each row is instead a link to
 * its own image, and the active row follows whichever image holds the
 * viewport midpoint — so what the list highlights and what the scroll shows
 * can never disagree.
 *
 * Either way the active row picks up a persistent underline + solid text
 * color rather than only on :hover, so the current category stays legible.
 * Positioning against the images is owned by the parent ServicesSection.
 */
export function ServicesList({
  label,
  heading,
  services,
  activeIndex,
  onActiveChange,
  linked = false,
  className,
}: ServicesListProps) {
  const lenisRef = useLenis()
  const prefersReducedMotion = usePrefersReducedMotion()

  /**
   * Scrolls to the linked image via Lenis, matching useSectionLinkClick's
   * behaviour (and its navbar offset) so tab navigation lands the same way
   * the main nav does. The scroll itself moves the active state — landing
   * the image under the navbar puts it well past the midpoint threshold —
   * so there is nothing to set here. Modified clicks are left alone, and a
   * missing target falls through to the browser's own anchor handling.
   */
  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, serviceId: string) {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const target = document.getElementById(servicesImageId(serviceId))
    if (!target) return

    event.preventDefault()

    const lenis = lenisRef?.current
    if (lenis) {
      lenis.scrollTo(target, { offset: NAV_SCROLL_OFFSET })
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    }
  }

  return (
    <div className={className}>
      <SectionLabel data-services-label className="mb-4">
        {label}
      </SectionLabel>
      <EditorialHeading id="services-heading" data-services-heading className="text-display-md">
        {heading}
      </EditorialHeading>

      <ol className="border-border mt-8 border-t">
        {services.map((service, index) => {
          const active = index === activeIndex
          const content = (
            <>
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
            </>
          )

          return (
            <li key={service.id} data-services-item className="border-border border-b">
              {linked ? (
                <a
                  href={`#${servicesImageId(service.id)}`}
                  onClick={(event) => handleNavigate(event, service.id)}
                  aria-current={active ? 'true' : undefined}
                  className={ROW_CLASSES}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  onMouseEnter={() => onActiveChange(index)}
                  onFocus={() => onActiveChange(index)}
                  onClick={() => onActiveChange(index)}
                  aria-current={active ? 'true' : undefined}
                  className={ROW_CLASSES}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
