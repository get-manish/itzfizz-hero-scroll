import { gsap } from './gsapSetup'
import { all, one } from './hooks'

/**
 * Pointer parallax on the two background layers and the magnetic header CTA.
 * Fine pointers only, never under reduced motion. It animates dedicated
 * `ptr` children and the CTA, which no other timeline touches.
 */
export function heroPointer(root: HTMLElement): () => void {
  const mm = gsap.matchMedia()
  mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const layers = all(root, 'ptr').map((el) => ({
      depth: Number(el.dataset.depth ?? 0),
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
    }))
    let px = 0
    let py = 0
    let frame = 0
    const apply = (): void => {
      frame = 0
      for (const layer of layers) {
        layer.x(px * layer.depth)
        layer.y(py * layer.depth)
      }
    }
    const queue = (): void => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onMove = (e: PointerEvent): void => {
      const r = root.getBoundingClientRect()
      px = (e.clientX - r.left) / r.width - 0.5
      py = (e.clientY - r.top) / r.height - 0.5
      queue()
    }
    const onLeave = (): void => {
      px = 0
      py = 0
      queue()
    }
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)

    const cta = one(root, 'cta')
    const ctaX = cta ? gsap.quickTo(cta, 'x', { duration: 0.5, ease: 'power3' }) : null
    const ctaY = cta ? gsap.quickTo(cta, 'y', { duration: 0.5, ease: 'power3' }) : null
    const ctaMove = (e: PointerEvent): void => {
      if (!cta) return
      const r = cta.getBoundingClientRect()
      ctaX?.((e.clientX - (r.left + r.width / 2)) * 0.28)
      ctaY?.((e.clientY - (r.top + r.height / 2)) * 0.4)
    }
    const ctaReset = (): void => {
      ctaX?.(0)
      ctaY?.(0)
    }
    cta?.addEventListener('pointermove', ctaMove)
    cta?.addEventListener('pointerleave', ctaReset)
    cta?.addEventListener('pointercancel', ctaReset)

    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      cta?.removeEventListener('pointermove', ctaMove)
      cta?.removeEventListener('pointerleave', ctaReset)
      cta?.removeEventListener('pointercancel', ctaReset)
      if (frame) cancelAnimationFrame(frame)
    }
  })
  return () => mm.revert()
}
