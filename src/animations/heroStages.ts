import { gsap } from './gsapSetup'
import { all, one } from './hooks'
import { UNITS, W } from './motion'
import { PILLS } from '../data/pills'
import { STAGES } from '../data/stages'

/* Clip-path boxes. The slack (-14% / -8%) keeps ascenders, the highlighter and
   letter-spacing from being shaved off when the word is fully shown. */
const CLIP_SHOWN = 'inset(-14% -8% -14% -8%)'
const CLIP_BELOW = 'inset(100% -8% -14% -8%)' // hidden, collapsed onto the bottom edge
const CLIP_ABOVE = 'inset(-14% -8% 114% -8%)' // hidden, collapsed onto the top edge

const smooth = (t: number): number => t * t * (3 - 2 * t)
const clamp01 = (t: number): number => Math.min(1, Math.max(0, t))

/**
 * Maps timeline progress 0..1 to 0..1 so that a stage value running 0..4 only
 * moves inside the hand-over windows and rests (holds) everywhere else.
 */
const stageEase: gsap.EaseFunction = (p) => {
  let sum = 0
  for (let i = 1; i < UNITS; i++) sum += smooth(clamp01((p * UNITS - (i - W)) / (2 * W)))
  return sum / (UNITS - 1)
}

interface Tone {
  readonly off: gsap.TweenVars
  readonly on: gsap.TweenVars
}

/**
 * Builds the timeline that swaps the stage content. It is NOT scrolled here:
 * heroScroll adds it to the one scrubbed master timeline at time 0.
 *
 * Ownership rules this file follows (so no two tweens share a property):
 *  - entry tweens target the LEAVES of a layer (words, paragraph, bullets);
 *  - exit tweens target the WRAPPERS (headline element, body element);
 *  - "active during one stage" states (tab highlight, caption, pill emphasis)
 *    are ONE yoyo tween per element, not an in tween plus an out tween.
 * The layers' own opacity is never tweened, so there is nothing to fight.
 */
export function buildStages(root: HTMLElement, place: (stage: number) => void): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: 'none' } })
  /* fromTo that skips an empty target list instead of warning "target not found". */
  const add = (targets: Element[], from: gsap.TweenVars, to: gsap.TweenVars, at: number): void => {
    if (targets.length > 0) tl.fromTo(targets, from, to, at)
  }
  const layers = all(root, 'layer')
  const tabs = all(root, 'tab')
  const marks = all(root, 'tabmark')
  const captions = all(root, 'tabcap')
  let active = -1

  /* Which stage is "current" for assistive tech: only that layer is exposed
     and focusable, so the hidden CTA can never be tabbed to. */
  const activate = (index: number): void => {
    active = index
    layers.forEach((layer, i) => {
      layer.inert = i !== index
    })
    tabs.forEach((tab, i) => {
      if (i === index) tab.setAttribute('aria-current', 'step')
      else tab.removeAttribute('aria-current')
    })
  }
  activate(0)

  /* ---- one yoyo (or one-way) tween that is "on" only during stage `index` ---- */
  const pulse = (targets: gsap.TweenTarget, index: number, { off, on }: Tone): void => {
    const d = 2 * W
    if (index === 0) tl.fromTo(targets, on, { ...off, duration: d }, 1 - W)
    else if (index === UNITS - 1) tl.fromTo(targets, off, { ...on, duration: d }, index - W)
    else {
      tl.fromTo(
        targets,
        off,
        { ...on, duration: d, repeat: 1, yoyo: true, repeatDelay: 1 - d, ease: 'power1.inOut' },
        index - W,
      )
    }
  }

  /* ---- layer hand-overs ---- */
  layers.forEach((layer, i) => {
    const headline = one(layer, 'headline')
    const body = one(layer, 'body')
    if (!headline || !body) return

    if (i < UNITS - 1) {
      const t = i + 1 - W
      add(
        [headline],
        { y: 0, opacity: 1, clipPath: CLIP_SHOWN },
        { y: -44, opacity: 0, clipPath: CLIP_ABOVE, duration: 0.16, ease: 'power2.in' },
        t,
      )
      add([body], { y: 0, opacity: 1 }, { y: -20, opacity: 0, duration: 0.14, ease: 'power2.in' }, t + 0.02)
    }

    if (i > 0) {
      const t = i - W
      const words = all(layer, 'word')
      const points = all(layer, 'point')
      add(
        words,
        { y: 36, opacity: 0, clipPath: CLIP_BELOW },
        { y: 0, opacity: 1, clipPath: CLIP_SHOWN, duration: 0.16, ease: 'power3.out', stagger: 0.05 },
        t + 0.18,
      )
      add(all(layer, 'copy'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.14, ease: 'power2.out' }, t + 0.24)
      add(points, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12, ease: 'power2.out', stagger: 0.04 }, t + 0.28)
      add(all(layer, 'pointmark'), { scale: 0 }, { scale: 1, duration: 0.1, ease: 'back.out(2)', stagger: 0.04 }, t + 0.3)
    }
  })

  /* ---- stage number slides, progress fills, tabs and captions follow ---- */
  const track = one(root, 'stagenum')
  if (track) {
    tl.fromTo(track, { yPercent: 0 }, { yPercent: -(100 * (UNITS - 1)) / UNITS, duration: UNITS, ease: stageEase }, 0)
  }
  const progress = one(root, 'progress')
  if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: UNITS }, 0)

  marks.forEach((mark, i) => pulse(mark, i, { off: { opacity: 0 }, on: { opacity: 1 } }))
  captions.forEach((caption, i) => pulse(caption, i, { off: { opacity: 0 }, on: { opacity: 1 } }))

  /* ---- pills: emphasis per stage (scale + yellow fill overlay) ---- */
  all(root, 'pill').forEach((anchor) => {
    const pill = PILLS.find((p) => p.id === anchor.dataset.pill)
    if (!pill || pill.emphasis === null) return
    pulse(anchor, pill.emphasis, { off: { scale: 1 }, on: { scale: 1.2 } })
    pulse(all(anchor, 'pillfill'), pill.emphasis, { off: { opacity: 0 }, on: { opacity: 1 } })
  })

  /* ---- the stage position: drives pill placement and the active stage ---- */
  const position = { stage: 0 }
  tl.fromTo(
    position,
    { stage: 0 },
    {
      stage: STAGES.length - 1,
      duration: UNITS,
      ease: stageEase,
      onUpdate: () => {
        place(position.stage)
        const index = Math.round(position.stage)
        if (index !== active) activate(index)
      },
    },
    0,
  )

  return tl
}
