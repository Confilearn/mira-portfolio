import { cva } from 'class-variance-authority'

const BUTTON_BASE = [
  'inline-flex items-center justify-center gap-2 font-sans whitespace-nowrap',
  'transition-colors duration-[var(--duration-fast)] ease-editorial',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  'disabled:pointer-events-none disabled:opacity-40',
].join(' ')

/** Bounded button box, shared by PrimaryButton and SecondaryButton. */
export const buttonVariants = cva(BUTTON_BASE, {
  variants: {
    intent: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary: 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
    },
    size: {
      sm: 'h-9 px-4 text-body-sm',
      md: 'h-11 px-6 text-body',
      lg: 'h-12 px-8 text-body-lg',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

/**
 * TextButton is shaped like an inline link, not a button box, so it gets its
 * own variant set rather than fighting buttonVariants' fixed height/padding.
 */
export const textButtonVariants = cva([BUTTON_BASE, 'h-auto bg-transparent p-0 text-primary underline-offset-4 hover:underline'].join(' '), {
  variants: {
    size: {
      sm: 'text-body-sm',
      md: 'text-body',
      lg: 'text-body-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
