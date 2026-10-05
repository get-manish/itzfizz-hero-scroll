/**
 * Static hero content that is not part of a scroll stage.
 *
 * Source: https://itzfizz.com/ (home page). Each block below says which
 * section of that page it comes from.
 */

/** Header navigation. Labels only; the demo links stay on the page. */
export const NAV_LINKS = ['Work', 'Services', 'Contact'] as const

/** Small badge above the stage headline. */
export const EYEBROW = 'Itzfizz Digital'

export interface Statistic {
  /** Final value as a number, e.g. 93 for "93%". */
  readonly target: number
  /** Appended to the number, e.g. "%". */
  readonly suffix: string
  /** Explanatory label under the figure. */
  readonly label: string
}

/**
 * Introduction-stage statistics.
 *
 * - 93%: itzfizz.com, SEO section ("93% of Online Experiences begin with a
 *   Search Engine").
 * - The two 100% figures describe how THIS hero is built, not Itzfizz. They
 *   were already in the design and are not claims from itzfizz.com.
 */
export const stats: readonly Statistic[] = [
  { target: 93, suffix: '%', label: 'of online experiences begin with a search engine (itzfizz.com)' },
  { target: 100, suffix: '%', label: 'of hero motion is tied to scroll progress' },
  { target: 100, suffix: '%', label: 'transform-based animation, no layout reflow' },
]
