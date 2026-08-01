import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button-variants'
import { ButtonContent } from './ButtonContent'
import type { ButtonBaseProps } from './types'

export type SecondaryButtonProps = ButtonBaseProps

/** Outlined button for secondary actions alongside a PrimaryButton. */
export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ size = 'md', loading = false, disabled, startIcon, endIcon, className, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ intent: 'secondary', size }), className)}
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

SecondaryButton.displayName = 'SecondaryButton'
