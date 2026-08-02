import type { ComponentPropsWithoutRef, MouseEvent } from 'react'
import { useSectionLinkClick } from '@/hooks/useSectionLinkClick'
import { cn } from '@/lib/utils'

export interface NavigationLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** In-page anchor (e.g. "#gallery") or external URL. */
  href: string
  /** Whether this link represents the section currently in view (scroll-spy driven). */
  active?: boolean
}

/**
 * Single navigation item. Shows an animated underline on hover/focus, and a
 * persistent one when active. Color is inherited (`text-current`) so it
 * follows whatever tone the parent navbar/menu sets. Clicking an in-page
 * anchor smooth-scrolls via Lenis instead of jumping natively.
 */
export function NavigationLink({
  href,
  active = false,
  className,
  children,
  onClick,
  ...props
}: NavigationLinkProps) {
  const handleSectionClick = useSectionLinkClick(href)

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    handleSectionClick(event)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative inline-flex items-center py-1',
        'text-caption text-current font-sans tracking-[0.12em] uppercase',
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
    </a>
  )
}
