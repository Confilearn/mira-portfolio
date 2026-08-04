import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Mobile browsers resize the viewport as their address bar collapses and
 * expands during a scroll. Left alone, every such resize triggers a full
 * ScrollTrigger refresh — which re-measures every trigger mid-gesture and makes
 * the scrubbed parallax visibly jump. Orientation changes still refresh.
 */
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
