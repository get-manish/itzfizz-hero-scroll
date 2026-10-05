import { fx } from '../../animations/hooks'
import type { BulletPoint, Stage } from '../../data/stages'
import Headline from './Headline'
import StageText from './StageText'

function Point({ point }: { readonly point: BulletPoint }) {
  return (
    <li {...fx('point')} className="flex items-start gap-3">
      <span
        {...fx('pointmark')}
        aria-hidden="true"
        className="mt-1.75 h-2.5 w-2.5 shrink-0 border-2 border-ink bg-fizz"
      />
      <span className="min-w-0">
        <span className="block text-sm font-bold md:text-base">{point.title}</span>
        {point.detail ? (
          <span className="hidden text-xs text-[#5A5A5A] md:block md:text-sm">{point.detail}</span>
        ) : null}
      </span>
    </li>
  )
}

/** Stages 02-05: headline, paragraph, bullets and (on the last stage) a CTA. */
export default function StageBody({ stage }: { readonly stage: Stage }) {
  return (
    <div {...fx('layer')} data-stage={stage.id} className="stage-layer">
      <Headline stage={stage} level="h2" stacked />
      <div {...fx('body')}>
        <StageText stage={stage} />
        {stage.points.length > 0 ? (
          <ul className="stage-points mt-4 grid gap-2.5 md:mt-5 md:gap-3">
            {stage.points.map((point) => (
              <Point key={point.title} point={point} />
            ))}
          </ul>
        ) : null}
        {stage.cta ? (
          <a href={stage.cta.href} {...fx('point')} className="btn btn-fizz mt-5 text-sm">
            {stage.cta.label}
          </a>
        ) : null}
      </div>
    </div>
  )
}
