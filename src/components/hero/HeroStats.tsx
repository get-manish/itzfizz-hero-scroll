import { useState } from 'react'
import { fx } from '../../animations/hooks'
import { stats } from '../../data/content'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

/**
 * The three Introduction statistics.
 *
 * The text starts at `0%` so the figure a visitor first sees is where the
 * count-up begins. Under reduced motion the final value is rendered directly;
 * the media query is read in a `useState` initialiser so it is known during
 * the very first render.
 */
export default function HeroStats() {
  const [reduced] = useState<boolean>(prefersReducedMotion)

  return (
    <dl className="mt-4 grid grid-cols-3 gap-3 md:mt-6 md:gap-6">
      {stats.map((s) => (
        <div {...fx('stat')} key={s.label} className="flex min-w-0 flex-col-reverse gap-1 md:gap-1.5">
          <dt className="text-[9px] leading-tight text-[#5A5A5A] md:text-[11px]">{s.label}</dt>
          <dd className="stat-value font-extrabold leading-none">
            <span
              {...fx('count')}
              data-target={s.target}
              data-suffix={s.suffix}
              aria-hidden="true"
              className="inline-block"
            >
              {reduced ? `${s.target}${s.suffix}` : `0${s.suffix}`}
            </span>
            <span className="sr-only">{`${s.target}${s.suffix}`}</span>
          </dd>
          <span {...fx('rule')} aria-hidden="true" className="block h-0.75 w-full origin-left bg-ink" />
        </div>
      ))}
    </dl>
  )
}
