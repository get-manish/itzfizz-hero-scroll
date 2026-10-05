import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* The only place plugins are registered and ScrollTrigger is configured. */
gsap.registerPlugin(ScrollTrigger)

/* Mobile browsers resize the viewport when the URL bar collapses. Without this
   every one of those resizes refreshes the trigger and the pinned frame jumps. */
ScrollTrigger.config({ ignoreMobileResize: true })

/* Development-only handle so a browser test can read ScrollTrigger.getAll(). */
if (import.meta.env.DEV) {
  Object.assign(window as unknown as Record<string, unknown>, { gsap, ScrollTrigger })
}

export { gsap, ScrollTrigger }
