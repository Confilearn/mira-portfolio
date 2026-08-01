import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '@/lib/utils'
import type { Size } from '@/types/design-system'

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export interface IconWrapperProps extends ComponentPropsWithoutRef<'span'> {
  /** Icon component, typically from lucide-react. */
  icon: ElementType
  /** Defaults to `md`. */
  size?: Size
  /** Accessible label. Omit for purely decorative icons (the default). */
  label?: string
}

/** Consistent sizing for icons. Decorative (aria-hidden) unless a `label` is given. */
export function IconWrapper({ icon: Icon, size = 'md', label, className, ...props }: IconWrapperProps) {
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      {...props}
    >
      <Icon className={SIZE_CLASSES[size]} />
    </span>
  )
}
