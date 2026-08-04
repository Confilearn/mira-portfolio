import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { useParallaxIntensity } from './parallax'

/** Set by GalleryItem; its value is the tile's zero-based grid column. */
const SELECTOR = '[data-gallery-parallax]'

/**
 * Total travel, in px, for a column at depth 1 — read against the column depths
 * below, so the outer columns land at 72px and 168px across the grid's entire
 * pass through the viewport. What the eye actually reads is the difference
 * between neighbouring columns: the outer two sweep ~96px past each other over
 * that pass, which is enough to see the columns moving at different speeds. The
 * cost is that the grid's designed row alignment is only exact at the midpoint
 * of the scrub — pushing this much further trades the layout for the effect.
 */
const BASE_TRAVEL = 120

/**
 * Depth per column, indexed by column number: the left column trails the page,
 * the middle one tracks it, the right one leads. Columns beyond this list (were
 * the grid ever widened) simply run at the reference depth.
 */
const COLUMN_DEPTH = [0.6, 1, 1.4]

const REFERENCE_DEPTH = 1

/**
 * The gallery's signature motion: the three columns scrub past each other at
 * slightly different speeds, giving the grid depth without any single tile
 * calling attention to itself. Tiles are grouped into one tween per column and
 * driven by a single ScrollTrigger for the whole grid, so the page carries three
 * tweens rather than one per photograph.
 *
 * The drift targets each tile's inner button, not the `li` that useGalleryReveal
 * animates, so the entrance stagger and the parallax never write to the same
 * element. Transform only — the grid's own boxes never move, so nothing reflows.
 *
 * Depth is scaled by useParallaxIntensity: full on desktop, softened below `lg`,
 * and skipped entirely under prefers-reduced-motion, in which case no
 * ScrollTrigger is created. Scoped to `containerRef` and torn down on unmount.
 */
export function useGalleryParallax(containerRef: RefObject<HTMLElement | null>) {
  const intensity = useParallaxIntensity()

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root || intensity === 0) return

    const ctx = gsap.context(() => {
      const byColumn = new Map<number, HTMLElement[]>()

      for (const tile of gsap.utils.toArray<HTMLElement>(SELECTOR)) {
        const column = Number(tile.dataset.galleryParallax)
        if (!Number.isInteger(column)) continue

        const columnTiles = byColumn.get(column)
        if (columnTiles) columnTiles.push(tile)
        else byColumn.set(column, [tile])
      }

      if (byColumn.size === 0) return

      const timeline = gsap.timeline({
        defaults: { ease: 'none', force3D: true, duration: 1 },
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      for (const [column, columnTiles] of byColumn) {
        const depth = COLUMN_DEPTH[column] ?? REFERENCE_DEPTH
        const travel = (BASE_TRAVEL * depth * intensity) / 2

        timeline.fromTo(columnTiles, { y: -travel }, { y: travel }, 0)
      }
    }, root)

    return () => ctx.revert()
  }, [containerRef, intensity])
}
