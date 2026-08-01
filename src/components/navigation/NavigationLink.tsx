import type { ComponentPropsWithoutRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface NavigationLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'to'> {
  /** Route path or in-page hash (e.g. "/" or "#gallery"). */
  href: string
}

function isActiveHref(href: string, pathname: string, hash: string) {
  return href === '/' ? pathname === '/' && hash === '' : hash === href
}

/**
 * Single navigation item. Shows an animated underline on hover/focus, and a
 * persistent one when active. Color is inherited (`text-current`) so it
 * follows whatever tone the parent navbar/menu sets.
 */
export function NavigationLink({ href, className, children, ...props }: NavigationLinkProps) {
  const { pathname, hash } = useLocation()
  const active = isActiveHref(href, pathname, hash)

  return (
    <Link
      to={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative inline-flex items-center py-1',
        'text-body-sm text-current font-sans tracking-[0.15em] uppercase',
        'transition-opacity duration-[var(--duration-fast)] ease-editorial hover:opacity-70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[currentColor] focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current',
          'transition-transform duration-[var(--duration-normal)] ease-editorial',
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
          active && 'scale-x-100',
        )}
      />
    </Link>
  )
}
