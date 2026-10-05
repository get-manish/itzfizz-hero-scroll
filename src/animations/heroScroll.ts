import { gsap, ScrollTrigger } from './gsapSetup'
import { all, one } from './hooks'
import { addParallax } from './heroParallax'
import { buildStages } from './heroStages'
import { DESKTOP, MOBILE, TABLET, UNITS, W } from './motion'
import { createPillPlacer } from './pillLayout'

/** Scroll progress (0..1) at which stage `i` is resting in the middle of its hold. */
const restProgress = (i: number): number => {
  if (i === 0) return 0
  const lo = i + W
  const hi = i === UNITS - 1 ? UNITS : i + 1 - W
  return (lo + hi) / 2 / UNITS
}

/**
 * The hero's ONE ScrollTrigger: a pinned, scrubbed master timeline that holds
 * the depth layers and the stage timeline. Breakpoints and reduced motion go
 * through matchMedia, so a resize across a breakpoint rebuilds it cleanly.
 * Under reduced motion nothing is pinned or scrubbed; the CSS renders the five
 * stages as ordinary stacked content and the pills just sit in their layout.
 */
export function heroScroll(root: HTMLElement): () => void {
  const mm = gsap.matchMedia()
  let disposed = false

  mm.add(
    {
      reduce: '(prefers-reduced-motion: reduce)',
      mobile: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 1199px)',
      desktop: '(min-width: 1200px)',
    },
    (ctx) => {
      const c = (ctx.conditions ?? {}) as Record<string, boolean>
      const placer = createPillPlacer(root)
      if (c.reduce) return placer.dispose

      const motion = c.mobile ? MOBILE : c.tablet ? TABLET : DESKTOP
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: motion.pin,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      addParallax(tl, root, motion)
      tl.add(buildStages(root, placer.place), 0)

      /* Tab buttons scroll to the middle of their stage's hold. */
      const goTo = (i: number): void => {
        const st = tl.scrollTrigger
        if (!st) return
        const top = st.start + (st.end - st.start) * restProgress(i)
        window.scrollTo({ top, behavior: 'smooth' })
      }
      const off = all(root, 'tab').map((tab, i) => {
        const onClick = (): void => goTo(i)
        tab.addEventListener('click', onClick)
        return () => tab.removeEventListener('click', onClick)
      })

      return () => {
        off.forEach((remove) => remove())
        placer.dispose()
        all(root, 'layer').forEach((layer) => {
          layer.inert = false
        })
        all(root, 'tab').forEach((tab) => tab.removeAttribute('aria-current'))
      }
    },
  )

  /* A webfont landing after the first measurement would shift the pin. */
  void document.fonts?.ready.then(() => {
    if (!disposed && one(root, 'layer')) ScrollTrigger.refresh()
  })

  return () => {
    disposed = true
    mm.revert()
  }
}
