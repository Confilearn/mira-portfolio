import type { ReactNode } from 'react'
import { ButtonSpinner } from './ButtonSpinner'

interface ButtonContentProps {
  loading: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  children: ReactNode
}

/** Shared icon/label/spinner layout for all button variants. The label stays visible while loading. */
export function ButtonContent({ loading, startIcon, endIcon, children }: ButtonContentProps) {
  return (
    <>
      {loading ? <ButtonSpinner /> : startIcon}
      {children}
      {!loading && endIcon}
    </>
  )
}
