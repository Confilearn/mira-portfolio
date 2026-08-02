import { NAV_LINKS } from '@/constants/navigation'
import { NavigationLink } from './NavigationLink'

export interface DesktopNavigationProps {
  className?: string
  /** Section id currently in view (scroll-spy), without the leading "#". */
  activeId?: string | null
}

/** Inline navigation links, visible from `md` upward. */
export function DesktopNavigation({ className, activeId }: DesktopNavigationProps) {
  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-7 lg:gap-9">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavigationLink href={link.href} active={activeId === link.href.slice(1)}>
              {link.label}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
