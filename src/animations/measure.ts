/**
 * Layout-based measurements for clamping the core to its artwork box.
 *
 * These read offsetLeft/offsetWidth, which ignore transforms, so a value is
 * the same whether the intro scale or a scroll tween is mid-flight. Each
 * helper returns a function so GSAP re-reads it on every ScrollTrigger refresh
 * (invalidateOnRefresh).
 */

/** Largest translate on `axis` that keeps `el` inside `box`, minus `pad`. */
export const safeDelta =
  (el: HTMLElement, box: HTMLElement, axis: 'x' | 'y', desired: number, pad = 8) =>
  (): number => {
    const start = axis === 'x' ? el.offsetLeft : el.offsetTop
    const size = axis === 'x' ? el.offsetWidth : el.offsetHeight
    const room = axis === 'x' ? box.offsetWidth : box.offsetHeight
    const lo = pad - start
    const hi = room - pad - (start + size)
    return Math.max(Math.min(0, lo), Math.min(Math.max(0, hi), desired))
  }

/** Largest scale that keeps a centred `el` inside `box`, allowing for its own travel. */
export const safeScale =
  (el: HTMLElement, box: HTMLElement, desired: number, dx: number, dy: number, pad = 6) =>
  (): number => {
    const fitX = (box.offsetWidth - pad * 2 - Math.abs(dx) * 2) / Math.max(1, el.offsetWidth)
    const fitY = (box.offsetHeight - pad * 2 - Math.abs(dy) * 2) / Math.max(1, el.offsetHeight)
    return Math.max(0.3, Math.min(desired, fitX, fitY))
  }
