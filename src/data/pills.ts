/**
 * The four service pills that orbit the "10X GROWTH" core.
 *
 * Source: https://itzfizz.com/ — the three services it advertises (SEO,
 * website development, social media marketing). UI/UX is carried over from
 * the existing design as the discipline behind the web work.
 */
export type PillId = 'seo' | 'web' | 'uiux' | 'smm'

/** Index into STAGES: 0 Introduction ... 4 Next. */
export type StageIndex = 0 | 1 | 2 | 3 | 4

/** Angle on the orbit ring (degrees, 0 = right, 90 = down) at each stage. */
export type PillPoses = readonly [number, number, number, number, number]

export interface Pill {
  /** Stable key, also written to `data-pill`. */
  readonly id: PillId
  readonly label: string
  /** Where the pill sits on the ring at every stage. */
  readonly poses: PillPoses
  /** Stage in which this pill is emphasised, or null for none. */
  readonly emphasis: StageIndex | null
}

/** Advance a pill 72 degrees round the ring per stage, starting at `base`. */
const ring = (base: number): PillPoses => [base, base + 72, base + 144, base + 216, base + 288]

/** Bases are 90 degrees apart, so the four pills never meet on the ring. */
export const PILLS: readonly Pill[] = [
  { id: 'seo', label: 'SEO', poses: ring(-60), emphasis: 1 },
  { id: 'web', label: 'WEB', poses: ring(30), emphasis: 2 },
  { id: 'uiux', label: 'UI/UX', poses: ring(120), emphasis: null },
  { id: 'smm', label: 'SMM', poses: ring(210), emphasis: 3 },
]
