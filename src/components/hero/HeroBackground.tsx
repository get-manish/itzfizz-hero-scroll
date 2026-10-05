import { fx } from '../../animations/hooks'

/** Slowest depth: the butter disc and the dot grid. Both are decorative. */
export default function HeroBackground() {
  return (
    <>
      <div {...fx('bg')} className="wc absolute inset-0 z-0 overflow-clip" aria-hidden="true">
        <div
          {...fx('ptr')}
          data-depth="16"
          className="absolute right-[-22%] top-[2%] aspect-square w-[86vmin] rounded-full bg-butter/80"
        />
      </div>
      <div {...fx('dots')} className="wc dots absolute inset-0 z-1 overflow-clip" aria-hidden="true">
        <div {...fx('ptr')} data-depth="26" className="absolute inset-[-15%]" />
      </div>
    </>
  )
}
