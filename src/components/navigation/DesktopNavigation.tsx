import { NAV_LINKS } from '@/constants/navigation'
import { NavigationLink } from './NavigationLink'

export interface DesktopNavigationProps {
  className?: string
}

/** Inline navigation links, visible from `md` upward. */
export function DesktopNavigation({ className }: DesktopNavigationProps) {
  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-8 lg:gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavigationLink href={link.href}>{link.label}</NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
