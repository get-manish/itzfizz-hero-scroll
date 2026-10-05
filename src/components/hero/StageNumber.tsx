import { fx } from '../../animations/hooks'
import { STAGES } from '../../data/stages'

/** Large outlined stage number. The track slides inside a one-line window. */
export default function StageNumber() {
  return (
    <div className="stage-num outline-num" aria-hidden="true">
      <div {...fx('stagenum')} className="stage-num-track">
        {STAGES.map((stage) => (
          <span key={stage.id} className="block">
            {stage.number}
          </span>
        ))}
      </div>
    </div>
  )
}
