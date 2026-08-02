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
              active ? 'scale-[1.015] opacity-100' : 'scale-100 opacity-0',
            )}
          />
        )
      })}
    </div>
  )
}
