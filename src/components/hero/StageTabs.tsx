import { fx } from '../../animations/hooks'
import { STAGES } from '../../data/stages'
import ProgressBar from './ProgressBar'

/**
 * Stage tab bar. Five real buttons (so Tab, Enter and Space work), a yellow
 * highlighter behind the active one, and the progress line underneath.
 * Narrow screens show the stage numbers plus one caption line; from 560px up
 * every tab shows its own label. The full label is always in `aria-label`.
 */
export default function StageTabs() {
  return (
    <nav aria-label="Story stages" className="stage-tabs relative z-10 shrink-0 pb-2.5">
      <p
        aria-hidden="true"
        className="mb-0.5 grid h-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] min-[560px]:hidden"
      >
        {STAGES.map((stage, i) => (
          <span
            key={stage.id}
            {...fx('tabcap')}
            className={`col-start-1 row-start-1 ${i === 0 ? '' : 'opacity-0'}`}
          >
            {stage.label}
          </span>
        ))}
      </p>
      <ol className="grid grid-cols-5">
        {STAGES.map((stage, i) => (
          <li key={stage.id} className="min-w-0">
            <button
              type="button"
              {...fx('tab')}
              data-index={i}
              aria-label={`Stage ${stage.number}: ${stage.label}`}
              className="relative flex min-h-11 w-full flex-col items-center justify-center px-1 text-[10px] font-bold uppercase tracking-[0.12em] md:text-[11px]"
            >
              <span
                {...fx('tabmark')}
                aria-hidden="true"
                className={`absolute inset-x-1 inset-y-1 bg-fizz ${i === 0 ? '' : 'opacity-0'}`}
              />
              <span className="relative tabular-nums">{stage.number}</span>
              <span className="relative hidden text-center leading-tight min-[560px]:block">
                {stage.label}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <ProgressBar />
    </nav>
  )
}
