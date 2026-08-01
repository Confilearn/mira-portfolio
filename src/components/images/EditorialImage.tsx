import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { LazyImage, type LazyImageProps } from './LazyImage'
import { Caption } from '@/components/typography'

type EditorialImageRatio = 'portrait' | 'square' | 'landscape' | 'full-bleed'

const RATIO_VALUES: Record<Exclude<EditorialImageRatio, 'full-bleed'>, string> = {
  portrait: '4 / 5',
  square: '1 / 1',
  landscape: '3 / 2',
}

export interface EditorialImageProps extends Omit<LazyImageProps, 'aspectRatio'> {
  /** Defaults to `portrait`, the standard editorial crop. `full-bleed` skips a fixed ratio entirely. */
  ratio?: EditorialImageRatio
  caption?: ReactNode
  credit?: ReactNode
}

/** LazyImage with an editorial aspect ratio and an optional caption/credit. */
export function EditorialImage({ ratio = 'portrait', caption, credit, wrapperClassName, ...props }: EditorialImageProps) {
  const aspectRatio = ratio === 'full-bleed' ? undefined : RATIO_VALUES[ratio]
  const image = (
    <LazyImage
      aspectRatio={aspectRatio}
      wrapperClassName={cn(ratio === 'full-bleed' && 'h-full', wrapperClassName)}
      {...props}
    />
  )

  if (!caption && !credit) {
    return image
  }

  return (
    <figure className="w-full">
      {image}
      <figcaption
        className={cn('mt-3 flex items-baseline gap-4', caption && credit ? 'justify-between' : 'justify-start')}
      >
        {caption && <Caption>{caption}</Caption>}
        {credit && <Caption className="text-muted-foreground/70">{credit}</Caption>}
      </figcaption>
    </figure>
  )
}
