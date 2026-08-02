export interface NavigationItem {
  label: string
  /** Route path (e.g. "/") or in-page hash (e.g. "#gallery"). Resolved through react-router's <Link>. */
  href: string
}

/** Primary site navigation, shared by DesktopNavigation and MobileMenuOverlay. */
export const NAV_LINKS: readonly NavigationItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

/** Section ids tracked by scroll-spy, derived from NAV_LINKS's in-page anchors. */
export const NAV_SECTION_IDS: readonly string[] = NAV_LINKS.map((link) => link.href.slice(1))
