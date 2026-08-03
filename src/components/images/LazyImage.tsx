import { useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface LazyImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'alt'> {
  /**
   * Required. Describe the image for screen readers, or pass `""` if it is
   * purely decorative and already described by surrounding content.
   */
  alt: string
  /** CSS aspect-ratio (e.g. "4 / 5"), reserving layout space before the image loads. */
  aspectRatio?: string
  /** Class applied to the sizing wrapper, as opposed to the `img` element itself. */
  wrapperClassName?: string
}

/**
 * Responsive, lazily-loaded image with a muted placeholder that fades into the
 * loaded image. `src`/`srcSet`/`sizes` are passed straight to `<img>`, so this
 * works unchanged whether `src` is a local asset import or, later, a Cloudinary URL.
 * `loading` defaults to `lazy`; pass `eager` for images above the fold.
 */
export function LazyImage({
  alt,
  aspectRatio,
  wrapperClassName,
  className,
  style,
  onLoad,
  loading = 'lazy',
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn('bg-muted relative w-full overflow-hidden', wrapperClassName)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        alt={alt}
        loading={loading}
        decoding="async"
        className={cn(
          'h-full w-full object-cover opacity-0 transition-opacity duration-[var(--duration-slow)] ease-editorial',
          loaded && 'opacity-100',
          className,
        )}
        style={style}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
        {...props}
      />
    </div>
  )
}
