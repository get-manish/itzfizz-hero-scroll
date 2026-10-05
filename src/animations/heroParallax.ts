import { all, one } from './hooks'
import { safeDelta, safeScale } from './measure'
import { UNITS, type Motion } from './motion'

/**
 * Scroll-owned depth layers: background, dots, decoration, core, "10X" and
 * the arrow. Every tween spans the whole story (UNITS) and is the ONLY tween
 * on its element, with explicit start and end values (fromTo), so nothing is
 * ever captured from another timeline's leftover state.
 *
 * The core's translate and scale are clamped to the artwork box, so it can
 * never be clipped. Its rotation here is the scroll rotation; the idle spin
 * lives on an inner wrapper (see heroSpin).
 */
export function addParallax(tl: gsap.core.Timeline, root: HTMLElement, M: Motion): void {
  const span = { duration: UNITS }
  const bg = all(root, 'bg')
  const dots = all(root, 'dots')
  const arrow = all(root, 'arrow')
  const ten = all(root, 'ten')
  const box = one(root, 'visualbox')
  const core = one(root, 'core')

  if (bg.length) tl.fromTo(bg, { x: 0, y: 0, scale: 1 }, { x: M.bg.x, y: M.bg.y, scale: M.bg.scale, ...span }, 0)
  if (dots.length) tl.fromTo(dots, { y: 0, scale: 1 }, { y: M.dots.y, scale: M.dots.scale, ...span }, 0)

  all(root, 'deco').forEach((el, i) => {
    const d = M.deco[i]
    if (!d) return
    tl.fromTo(
      el,
      { x: 0, y: 0, scale: 1, opacity: 0.85 },
      { x: d.x, y: d.y, scale: d.scale, opacity: 0.35, ...span, ease: 'power1.inOut' },
      0,
    )
  })

  if (core && box) {
    tl.fromTo(
      core,
      { x: 0, y: 0, scale: 0.98, rotation: -3 },
      {
        x: safeDelta(core, box, 'x', M.core.x),
        y: safeDelta(core, box, 'y', M.core.y),
        scale: safeScale(core, box, M.core.scaleOut, M.core.x, M.core.y),
        rotation: M.core.spin,
        ...span,
      },
      0,
    )
  }
  if (ten.length) tl.fromTo(ten, { scale: 1 }, { scale: M.ten.scale, ...span, ease: 'power1.inOut' }, 0)
  if (arrow.length) {
    tl.fromTo(arrow, { x: 0, y: 0, opacity: 1 }, { x: M.arrow.x, y: M.arrow.y, opacity: 0.5, ...span }, 0)
  }
}
