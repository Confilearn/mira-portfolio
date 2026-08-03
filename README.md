# MIRA — Luxury Editorial Portfolio

A premium, photography-first portfolio site for an international editorial and runway fashion model, built as both a professional presence and a demonstration of production-grade frontend engineering.

The project has two equally weighted goals: present Mira credibly to agencies, brands and editors, and demonstrate the kind of frontend craftsmanship — motion, performance, accessibility, architecture — that a premium client would expect from an agency-level build.

## Design Inspiration

The visual language draws on editorial fashion publishing and luxury houses — Vogue, Dior, Prada, Saint Laurent, Loewe, Harper's Bazaar — without copying any of them. The brief: editorial, cinematic, quiet, timeless. Photography carries the story; the interface exists to support it, never compete with it. Full design and motion rationale lives in [`docs/design-principles.md`](docs/design-principles.md) and [`docs/animation-principles.md`](docs/animation-principles.md).

## Features

- Full-bleed cinematic hero with a GSAP entrance timeline and scroll-scrubbed parallax
- Editorial gallery (curated masonry, not a uniform grid) with a keyboard- and touch-navigable fullscreen lightbox
- Scroll-triggered section reveals throughout, all torn down on unmount and short-circuited under `prefers-reduced-motion`
- Fullscreen animated mobile navigation with a focus-trapped overlay
- An editorial loading sequence that plays once per session
- Responsive AVIF/WebP image delivery generated at build time, with the hero eager-loaded at high priority and everything below the fold lazy-loaded
- Complete SEO: per-page metadata, canonical URLs, Open Graph/Twitter cards, JSON-LD `Person`/`WebSite` structured data, a generated social share image, manifest and icons
- WCAG-conscious accessibility: semantic landmarks, correct heading hierarchy, visible focus states, keyboard-operable modals, screen-reader-appropriate labeling throughout

## Technology Stack

| Concern   | Choice                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core      | React 19, TypeScript (strict), Vite                                                                                                                     |
| Styling   | Tailwind CSS v4, CSS custom properties as the single source of design tokens                                                                            |
| Animation | Framer Motion (menus, modals, component entrances), GSAP + ScrollTrigger + SplitType (scroll storytelling, text reveals), Lenis (smooth scrolling only) |
| Routing   | React Router DOM                                                                                                                                        |
| Images    | vite-imagetools (build-time AVIF/WebP/JPEG + responsive `srcset` generation via `sharp`)                                                                |
| SEO       | react-helmet-async                                                                                                                                      |
| Icons     | Lucide React                                                                                                                                            |
| Utilities | clsx, tailwind-merge, class-variance-authority                                                                                                          |

Each animation library owns exactly one responsibility (see [`docs/animation-principles.md`](docs/animation-principles.md)) — they're never mixed for the same interaction.

## Architecture

```
src/
  animations/    GSAP/Lenis hooks and setup — one hook per section's scroll reveal
  app/           Router and route-level pages (Home, NotFound)
  assets/        Local image assets (Version 1 — see docs/roadmap.md for the Cloudinary migration path)
  components/    Reusable, presentation-only UI (buttons, typography, layout, images, navigation, gallery, utility)
  constants/     Section copy and asset references, kept as data so a future CMS migration only touches this layer
  hooks/         Reusable, non-animation React hooks (focus trap, scroll spy, breakpoint, reduced motion, …)
  lib/           Framework-agnostic utilities (class merging, structured data)
  sections/      Page-specific composition of components for a single homepage section
  styles/        Global CSS and design tokens (colors, type scale, spacing, motion timing, z-index)
  types/         Shared TypeScript interfaces and ambient module declarations
```

`components/` and `sections/` are kept strictly separate: reusable UI never lives in `sections/`, and page-specific composition never leaks into `components/`. Business/copy data lives in `constants/`, isolated from presentation, so a future CMS integration touches one layer instead of every component.

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on Vite's default port with HMR. Static assets, the manifest, `robots.txt` and `sitemap.xml` are served from `public/`.

### Regenerating icons and the social share image

`apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and `og-image.jpg` in `public/` are generated, not hand-authored:

```bash
node scripts/generate-icons.mjs
```

Re-run it after changing `public/favicon.svg` or the hero photograph.

## Development Workflow

```bash
npm run lint          # ESLint (TypeScript + react-hooks rules)
npm run format        # Prettier, writes
npm run format:check  # Prettier, check only
```

TypeScript runs in strict mode project-wide (`noUncheckedIndexedAccess`, `noUnusedLocals`, no `any`). Sections stay under ~200–250 lines; when one grows past that, it gets split (see [`docs/component-inventory.md`](docs/component-inventory.md) for the component philosophy).

## Build & Deployment

```bash
npm run build    # tsc -b && vite build — type-checks, then builds to dist/
npm run preview  # Serves the production build locally for a final check
```

`dist/` is a static bundle — deploy it to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CDN, …) with SPA fallback routing enabled (all paths should serve `index.html`, since routing is client-side via React Router).

Before pointing this at a real domain, replace the placeholder values in `src/constants/site.ts` (`SITE_URL`), `public/robots.txt` and `public/sitemap.xml` (currently `https://mira-portfolio.example.com`), and swap the placeholder Google Fonts link in `index.html` for licensed, self-hosted fonts (see the comment there).

## Performance Considerations

- **Images**: every photo is imported through `vite-imagetools`, which generates AVIF, WebP and JPEG variants at multiple widths at build time. `LazyImage`/`HeroImage`/`Lightbox` render a `<picture>` with format `<source>`s and a sized JPEG `<img>` fallback, so browsers fetch the smallest format+size that fits the layout. The hero image is `loading="eager"` with `fetchPriority="high"` and is preloaded (`imagesrcset`/`imagesizes`, AVIF) from `index.html`'s `<head>`; every other image is `loading="lazy"`.
- **Bundle**: `gsap`, `framer-motion` and `react-router-dom` are split into their own vendor chunks (`vite.config.ts` → `build.rollupOptions.output.manualChunks`), and the gallery `Lightbox` is code-split via `React.lazy`/`Suspense` since it's only needed after a user interaction, not on initial paint.
- **Animation**: every GSAP timeline animates only `transform`/`opacity`, runs inside a `gsap.context()` scoped to its section, and is torn down (`ctx.revert()`) on unmount. Scroll-triggered reveals only initialize once their section approaches the viewport (`ScrollTrigger` with `once: true`) rather than running continuously.
- **Fonts**: the Google Fonts request only asks for the weights actually used in the UI (Playfair Display 400, Inter 400/500) with `display=swap`, rather than the full family.

## Accessibility Considerations

- Semantic landmarks throughout (`<main>`, `<nav>`, `<footer>`), a single `<h1>` per page, and a consistent heading hierarchy across sections.
- Both modals (mobile menu, lightbox) trap focus, restore it on close, and close on `Escape`.
- All interactive elements have visible `focus-visible` states — nothing relies on `:hover` alone.
- Every image requires explicit alt text (enforced at the type level); purely decorative images pass an empty string deliberately, not by omission.
- `prefers-reduced-motion` is checked by a single shared hook (`usePrefersReducedMotion`) and wired into every GSAP hook and Framer Motion consumer — reduced motion means elements settle at their final state instantly rather than not animating "half-heartedly."

## Animation Philosophy

Motion exists to support storytelling, not to demonstrate that animation is possible. Three tools, three non-overlapping responsibilities:

- **CSS** — hover states, small transitions, purely decorative loops.
- **Framer Motion** — menus, modals, component entrances, anything with mount/unmount lifecycle.
- **GSAP + ScrollTrigger + SplitType** — hero storytelling, scroll-triggered section reveals, text splitting.

Full rationale, timing bands and easing curves are documented in [`docs/animation-principles.md`](docs/animation-principles.md). The target reaction from a visitor is "smooth," not "animated."

## Future Improvements

See [`docs/roadmap.md`](docs/roadmap.md) for the full versioned plan. Near-term candidates once V1 is live:

- Cloudinary migration for asset management and on-demand transforms (the current `vite-imagetools` pipeline was deliberately built to make this a low-friction swap)
- Hero video with a static-image fallback
- Additional pages (dedicated Gallery, About, Journal) with page transitions
- Booking/inquiry form (React Hook Form + Zod were removed in the production-hardening pass since no form exists yet — reintroducing them is a single `npm install` away when V6 starts)
- Headless CMS integration — the `constants/` layer already isolates copy and asset references specifically so this migration touches one layer, not the components
