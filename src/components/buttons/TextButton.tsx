import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { textButtonVariants } from './button-variants'
import { ButtonContent } from './ButtonContent'
import type { ButtonBaseProps } from './types'

export type TextButtonProps = ButtonBaseProps

/** Inline, link-shaped button for tertiary actions ("View all", "Learn more"). */
export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ size = 'md', loading = false, disabled, startIcon, endIcon, className, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(textButtonVariants({ size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        <ButtonContent loading={loading} startIcon={startIcon} endIcon={endIcon}>
          {children}
        </ButtonContent>
      </button>
    )
  },
)

TextButton.displayName = 'TextButton'
