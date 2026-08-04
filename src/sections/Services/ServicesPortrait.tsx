import { cn } from '@/lib/utils'

export interface ServicesPortraitImage {
  src: string
  alt: string
}

export interface ServicesPortraitProps {
  images: ServicesPortraitImage[]
  activeIndex: number
  className?: string
}

/**
 * Editorial preview anchoring the right side of the Services section. All
 * category images are mounted at once, stacked and cross-faded by opacity —
 * never slid — so the browser fetches every frame up front (each still
 * `loading="lazy"`, so the fetch only kicks in once the section nears the
 * viewport) and switching categories feels instant rather than waiting on a
 * fresh image request. Only the active frame carries real alt text; the rest
 * are hidden from assistive tech until they become the visible one.
 *
 * The switch is a crossfade with a 6px upward drift and a 1.02 settle — the
 * incoming frame rises into place rather than sliding, so the interaction
 * reads as a page being turned, not a carousel advancing. Under
 * prefers-reduced-motion the frames simply swap, via the site-wide transition
 * reset in globals.css.
 */
export function ServicesPortrait({ images, activeIndex, className }: ServicesPortraitProps) {
  return (
    <div
      data-services-image
      className={cn('relative aspect-4/5 w-full overflow-hidden', className)}
    >
      {images.map((image, index) => {
        const active = index === activeIndex
        return (
          <img
            key={image.src}
            src={image.src}
            alt={active ? image.alt : ''}
            aria-hidden={active ? undefined : true}
            loading="lazy"
            decoding="async"
            className={cn(
              'absolute inset-0 h-full w-full object-cover object-top',
              'transition-[opacity,transform] duration-[var(--duration-slow)] ease-editorial',
              active
                ? 'translate-y-0 scale-[1.02] opacity-100'
                : 'translate-y-1.5 scale-100 opacity-0',
            )}
          />
        )
      })}
    </div>
  )
}
