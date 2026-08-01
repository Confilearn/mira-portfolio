import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button-variants'
import { ButtonContent } from './ButtonContent'
import type { ButtonBaseProps } from './types'

export type PrimaryButtonProps = ButtonBaseProps

/** Solid ink-filled button. The default call to action. */
export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ size = 'md', loading = false, disabled, startIcon, endIcon, className, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ intent: 'primary', size }), className)}
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

PrimaryButton.displayName = 'PrimaryButton'
