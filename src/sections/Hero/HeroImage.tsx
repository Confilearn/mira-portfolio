import { cn } from '@/lib/utils'

export interface HeroImageProps {
  src: string
  alt: string
  className?: string
}

/**
 * Full-bleed hero photograph. Unlike LazyImage (built for below-the-fold
 * content), this loads eagerly at high priority since it is the page's LCP
 * element. Gradient overlays keep the transparent nav and overlaid editorial
 * copy legible against the photograph without darkening it uniformly.
 *
 * The image sits in its own `data-hero-parallax` wrapper, separate from the
 * gradient overlays, so useParallax's scroll-scrubbed drift (see
 * HeroSection) moves only the photograph and never the pinned edge fades.
 */
export function HeroImage({ src, alt, className }: HeroImageProps) {
  return (
    <div className={cn('absolute inset-0', className)}>
      <div data-hero-parallax className="absolute inset-0 overflow-hidden">
        <img
          data-hero-image
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_18%] md:object-[50%_12%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="from-ink/50 pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent sm:h-40"
      />
      <div
        aria-hidden="true"
        className="from-ink/75 pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t to-transparent"
      />
    </div>
  )
}
