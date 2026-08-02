import { LazyImage } from '@/components/images'
import { cn } from '@/lib/utils'

export interface IntroductionPortraitProps {
  src: string
  alt: string
  className?: string
}

/**
 * Supporting portrait beneath the editorial statement. On larger screens it
 * lives in the right half of the row (asymmetric against the left-aligned
 * copy above) but stays centered within that half rather than pinned to the
 * container edge, matching the breathing room in the approved design;
 * centered full-width for balance on mobile. The GSAP reveal targets this
 * wrapper (opacity/scale) rather than the `img`, so it doesn't fight
 * LazyImage's own load-fade transition on the image itself.
 */
export function IntroductionPortrait({ src, alt, className }: IntroductionPortraitProps) {
  return (
    <div data-intro-image className={cn('mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto lg:w-1/2 lg:max-w-none', className)}>
      <div className="mx-auto w-full lg:max-w-md">
        <LazyImage src={src} alt={alt} aspectRatio="4 / 5" className="object-[50%_15%]" />
      </div>
    </div>
  )
}
