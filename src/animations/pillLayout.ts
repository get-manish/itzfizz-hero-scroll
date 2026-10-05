import { gsap } from './gsapSetup'
import { all, one } from './hooks'
import { PILLS } from '../data/pills'

export interface PillPlacer {
  /** Place every pill for a (fractional) stage position 0..4. */
  readonly place: (stage: number) => void
  readonly dispose: () => void
}

/** Gap between a pill and the layer edge; leaves room for the 1.2x emphasis scale. */
const EDGE = 10

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

/**
 * Puts the pills on an elliptical ring that fits inside their own layer.
 *
 * The ring is sized per pill from its own measured width and height, so a pill
 * can never leave the layer (and so never reaches the headline or stats), at any
 * breakpoint. x and y are written with quickSetter, not tweened, so the scroll
 * timeline only decides WHICH stage position to draw, never owns x or y.
 */
export function createPillPlacer(root: HTMLElement): PillPlacer {
  const box = one(root, 'pills')
  const anchors = all(root, 'pill')
  if (!box || anchors.length === 0) return { place: () => undefined, dispose: () => undefined }

  gsap.set(anchors, { x: 0, y: 0 })
  const setX = anchors.map((el) => gsap.quickSetter(el, 'x', 'px'))
  const setY = anchors.map((el) => gsap.quickSetter(el, 'y', 'px'))
  const radii = anchors.map(() => ({ x: 0, y: 0 }))
  let current = 0
  let signature = ''

  /* The artwork box is a CSS square, so if one side reads 0 (it can, during the
     first layout pass) the other side is the size. */
  const side = (): number => Math.max(box.offsetWidth, box.offsetHeight)
  const sizes = (): string =>
    `${side()}|${anchors.map((a) => (a.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0).join(',')}`

  const measure = (): void => {
    signature = sizes()
    anchors.forEach((anchor, i) => {
      const label = anchor.firstElementChild
      const w = label instanceof HTMLElement ? label.offsetWidth : 0
      const h = label instanceof HTMLElement ? label.offsetHeight : 0
      radii[i] = {
        x: Math.max(0, side() / 2 - w / 2 - EDGE),
        y: Math.max(0, side() / 2 - h / 2 - EDGE),
      }
    })
  }

  const place = (stage: number): void => {
    current = stage
    if (sizes() !== signature) measure()
    const lo = Math.min(4, Math.max(0, Math.floor(stage)))
    const hi = Math.min(4, lo + 1)
    const t = Math.min(1, Math.max(0, stage - lo))
    anchors.forEach((anchor, i) => {
      const pill = PILLS.find((p) => p.id === anchor.dataset.pill)
      const r = radii[i]
      if (!pill || !r) return
      const angle = (lerp(pill.poses[lo], pill.poses[hi], t) * Math.PI) / 180
      setX[i]?.(Math.cos(angle) * r.x)
      setY[i]?.(Math.sin(angle) * r.y)
    })
  }

  /* Re-measure when the layer resizes or a webfont changes a label's width. */
  const observer = new ResizeObserver(() => {
    measure()
    place(current)
  })
  observer.observe(box)
  anchors.forEach((anchor) => {
    if (anchor.firstElementChild) observer.observe(anchor.firstElementChild)
  })

  measure()
  place(0)
  return { place, dispose: () => observer.disconnect() }
}
