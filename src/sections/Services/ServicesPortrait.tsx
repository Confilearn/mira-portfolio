import { LazyImage } from '@/components/images'
import { cn } from '@/lib/utils'

export interface ServicesPortraitProps {
  src: string
  alt: string
  className?: string
}

/**
 * Editorial portrait anchoring the right side of the Services section. The
 * GSAP reveal targets this wrapper (opacity/scale) rather than the `img`, so
 * it doesn't fight LazyImage's own load-fade transition on the image itself.
 */
export function ServicesPortrait({ src, alt, className }: ServicesPortraitProps) {
  return (
    <div data-services-image className={cn('w-full', className)}>
      <LazyImage src={src} alt={alt} aspectRatio="4 / 5" className="object-top" />
    </div>
  )
}
