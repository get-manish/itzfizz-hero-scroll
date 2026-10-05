/** One timeline unit per stage; the whole story is UNITS long. */
export const UNITS = 5

/** Half-width (in units) of the window in which one stage hands over to the next. */
export const W = 0.2

interface Offset {
  readonly x: number
  readonly y: number
  readonly scale: number
}

/** Per-breakpoint composition of the scroll-owned layers. */
export interface Motion {
  /** ScrollTrigger `end` for the whole pin. */
  readonly pin: string
  readonly bg: Offset
  readonly dots: { readonly y: number; readonly scale: number }
  readonly deco: readonly Offset[]
  readonly core: { readonly scaleOut: number; readonly x: number; readonly y: number; readonly spin: number }
  readonly ten: { readonly scale: number }
  readonly arrow: { readonly x: number; readonly y: number }
}

export const MOBILE: Motion = {
  pin: '+=2600',
  bg: { x: -16, y: -30, scale: 1.05 },
  dots: { y: -22, scale: 1.03 },
  deco: [
    { x: -4, y: -6, scale: 1.1 },
    { x: 4, y: 4, scale: 0.9 },
    { x: -3, y: 6, scale: 1.15 },
  ],
  core: { scaleOut: 1.04, x: 4, y: -10, spin: 5 },
  ten: { scale: 1.06 },
  arrow: { x: -4, y: 4 },
}

export const TABLET: Motion = {
  pin: '+=3000',
  bg: { x: -30, y: -52, scale: 1.07 },
  dots: { y: -38, scale: 1.04 },
  deco: [
    { x: -6, y: -8, scale: 1.12 },
    { x: 6, y: 6, scale: 0.88 },
    { x: -4, y: 8, scale: 1.18 },
  ],
  core: { scaleOut: 1.08, x: 10, y: -16, spin: 7 },
  ten: { scale: 1.09 },
  arrow: { x: -6, y: 6 },
}

export const DESKTOP: Motion = {
  pin: '+=3400',
  bg: { x: -44, y: -74, scale: 1.08 },
  dots: { y: -54, scale: 1.05 },
  deco: [
    { x: -8, y: -10, scale: 1.15 },
    { x: 8, y: 8, scale: 0.85 },
    { x: -6, y: 10, scale: 1.2 },
  ],
  core: { scaleOut: 1.1, x: 14, y: -22, spin: 9 },
  ten: { scale: 1.12 },
  arrow: { x: -8, y: 8 },
}
