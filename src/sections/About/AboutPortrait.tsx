import { LazyImage } from '@/components/images'
import { cn } from '@/lib/utils'

export interface AboutPortraitProps {
  src: string
  alt: string
  className?: string
}

/**
 * Editorial runway image anchoring the left side of the About section. The
 * GSAP reveal targets this wrapper (opacity/scale) rather than the `img`,
 * so it doesn't fight LazyImage's own load-fade transition on the image itself.
 */
export function AboutPortrait({ src, alt, className }: AboutPortraitProps) {
  return (
    <div data-about-image className={cn('w-full', className)}>
      <LazyImage src={src} alt={alt} aspectRatio="4 / 5" />
    </div>
  )
}
