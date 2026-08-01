import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { Size } from '@/types/design-system'

export interface ButtonBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Defaults to `md`. */
  size?: Size
  /** Shows a spinner and disables interaction while true. The label stays visible. */
  loading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  children: ReactNode
}
