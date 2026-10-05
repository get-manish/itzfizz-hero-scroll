import { fx } from '../../animations/hooks'

/** The line under the tab bar. The scroll timeline scales the fill 0 to 1. */
export default function ProgressBar() {
  return (
    <div aria-hidden="true" className="h-[3px] w-full bg-ink/10">
      <div {...fx('progress')} className="h-full origin-left scale-x-0 bg-fizz" />
    </div>
  )
}
