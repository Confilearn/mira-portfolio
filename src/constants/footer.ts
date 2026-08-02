/**
 * Copy for the site footer's closing bar. The editorial closing statement
 * (heading + Instagram/WhatsApp/Zane Models links) already lives in the
 * Contact section's dark CTA — the footer only adds the copyright and credit
 * row beneath it.
 */
export const FOOTER_CONTENT = {
  copyright: `© ${new Date().getFullYear()} MIRA`,
  credit: {
    label: '@confibiz',
    href: 'https://confibiz.vercel.app',
  },
} as const
