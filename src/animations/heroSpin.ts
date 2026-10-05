import { gsap } from './gsapSetup'
import { one } from './hooks'

/** Seconds for one full turn of the core. */
const TURN = 20

/**
 * Continuous core spin. The inner wrapper turns +360 and the text wrapper
 * turns -360 in the same timeline, so "10X GROWTH" stays upright. Neither
 * element is touched by the scroll timeline (it owns the OUTER core). Off
 * under prefers-reduced-motion, live: the matchMedia reverts the spin.
 */
export function heroSpin(root: HTMLElement): () => void {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const spin = one(root, 'spin')
    const upright = one(root, 'upright')
    if (!spin || !upright) return undefined
    const turn = gsap.timeline({ repeat: -1, defaults: { ease: 'none', duration: TURN } })
    turn.to(spin, { rotation: 360 }, 0).to(upright, { rotation: -360 }, 0)
    return () => {
      turn.kill()
    }
  })
  return () => mm.revert()
}
