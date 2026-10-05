import { fx } from '../../animations/hooks'
import type { Stage } from '../../data/stages'
import Headline from './Headline'
import HeroStats from './HeroStats'
import StageText from './StageText'

/** Stage 01: the original first screen, a welcome headline, intro line and stats. */
export default function IntroStage({ stage }: { readonly stage: Stage }) {
  return (
    <div {...fx('layer')} data-stage={stage.id} className="stage-layer">
      <Headline stage={stage} level="h1" letters stacked />
      <div {...fx('body')}>
        <StageText stage={stage} />
        <HeroStats />
      </div>
    </div>
  )
}
