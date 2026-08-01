import Lenis from 'lenis'

/**
 * Factory for the site's smooth-scroll instance. Not mounted anywhere yet —
 * a future scroll provider/hook is responsible for instantiating this,
 * driving it from requestAnimationFrame, and calling destroy() on unmount.
 */
export function createLenis() {
  return new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
}
