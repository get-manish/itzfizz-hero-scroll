import { gsap } from './gsapSetup'
import { all, one } from './hooks'

/**
 * Load-in. Time-based, runs once, and only touches leaves of the first stage
 * (letters, paragraph, stats), the header, the eyebrow, the artwork wrapper
 * and the pill anchors' OPACITY. The scroll timeline owns different elements
 * (stage wrappers, core, backgrounds) or different properties (the anchors'
 * x, y and scale), so no tween here shares a property with a scroll tween.
 *
 * Under reduced motion nothing is built: every element stays at its final
 * state and the stats render their final figures.
 */
export function heroIntro(root: HTMLElement): gsap.core.Timeline {
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const first = one(root, 'layer') ?? root
    const counters = all(first, 'count')
    const numbers = counters.map((el) => ({
      el,
      target: Number(el.dataset.target ?? 0),
      suffix: el.dataset.suffix ?? '',
    }))
    const arrowPath = one<SVGPathElement>(root, 'arrowpath')

    /* Start every figure at "0%". The markup already says so, but a previous
       run's cleanup (React StrictMode re-runs effects) leaves the final text. */
    for (const n of numbers) n.el.textContent = `0${n.suffix}`

    intro
      .from(all(root, 'nav'), { opacity: 0, y: -18, duration: 0.5 })
      .from(all(root, 'eyebrow'), { opacity: 0, y: 16, duration: 0.45 }, '-=0.2')
      .from(all(first, 'letter'), { yPercent: 118, opacity: 0, duration: 0.7, stagger: 0.026 }, '-=0.25')
      .from(all(first, 'copy'), { opacity: 0, y: 16, duration: 0.5 }, '-=0.45')
      .addLabel('stats', '-=0.4')
      .fromTo(
        all(first, 'stat'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        'stats',
      )
      .from(all(first, 'rule'), { scaleX: 0, duration: 0.6, stagger: 0.08 }, '-=0.45')
      .from(all(root, 'visual'), { opacity: 0, scale: 0.9, duration: 0.9 }, '-=0.85')
      .from(all(root, 'pill'), { opacity: 0, duration: 0.45, stagger: 0.07 }, '-=0.55')

    /* Count-up: the markup already reads "0%", so the first painted figure is
       the one the count starts from. Lands on the exact value at the end. */
    const proxy = { v: 0 }
    intro.to(
      proxy,
      {
        v: 1,
        duration: 1.1,
        ease: 'power2.out',
        onUpdate: () => {
          for (const n of numbers) n.el.textContent = `${Math.round(n.target * proxy.v)}${n.suffix}`
        },
        onComplete: () => {
          for (const n of numbers) n.el.textContent = `${n.target}${n.suffix}`
        },
      },
      'stats',
    )

    if (arrowPath) {
      const length = arrowPath.getTotalLength()
      gsap.set(arrowPath, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 })
      intro.to(arrowPath, { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.5')
    }

    /* If the preference flips to "reduce" mid-session this reverts the tweens;
       make sure the figures are final rather than stuck mid-count. */
    return () => {
      for (const n of numbers) n.el.textContent = `${n.target}${n.suffix}`
      if (arrowPath) gsap.set(arrowPath, { clearProps: 'strokeDasharray,strokeDashoffset,opacity' })
    }
  })

  return intro
}
