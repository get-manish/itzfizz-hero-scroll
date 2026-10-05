import { fx } from '../../animations/hooks'
import { EYEBROW } from '../../data/content'
import { STAGES } from '../../data/stages'
import IntroStage from './IntroStage'
import StageBody from './StageBody'
import StageNumber from './StageNumber'

/**
 * The main content area. One layer per stage, all stacked in the same grid
 * cell so the area keeps the height of the tallest layer. Layers are never
 * added or removed while scrolling; the scroll timeline fades them.
 */
export default function StageContent() {
  return (
    <div className="hero-copy">
      <div className="mb-3 flex items-end justify-between gap-4">
        <p
          {...fx('eyebrow')}
          className="inline-block rounded-full bg-fizz px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] md:text-xs"
        >
          {EYEBROW}
        </p>
        <StageNumber />
      </div>
      <div className="stage-stack">
        {STAGES.map((stage) =>
          stage.id === 'introduction' ? (
            <IntroStage key={stage.id} stage={stage} />
          ) : (
            <StageBody key={stage.id} stage={stage} />
          ),
        )}
      </div>
    </div>
  )
}
