import { fx } from '../../animations/hooks'
import FloatingPills from './FloatingPills'

/* Small ink shapes tucked into the corners of the artwork box. */
const DECO = [
  'left-[1%] top-[1%] h-5 w-5 rounded-full border-[3px] border-ink md:h-7 md:w-7',
  'bottom-[3%] right-[2%] h-3 w-3 rotate-45 bg-ink md:h-4 md:w-4',
  'bottom-[1%] left-[2%] h-4 w-4 rounded-sm border-2 border-ink bg-white md:h-6 md:w-6',
] as const

/**
 * The artwork. DOM order is the paint order: decoration, core, pills, arrow.
 * Inside the core the spin wrapper turns slowly and the text wrapper turns
 * the opposite way, so "10X GROWTH" stays upright. The scroll timeline owns
 * the outer core's transform, the spin owns the inner wrapper's rotation.
 */
export default function HeroVisual() {
  return (
    <div {...fx('visualbox')} className="hero-visual">
      <div {...fx('visual')} className="absolute inset-0 isolate">
        {DECO.map((cls) => (
          <div key={cls} {...fx('deco')} aria-hidden="true" className={`absolute z-0 ${cls}`} />
        ))}

        <div {...fx('core')} className="core wc absolute inset-[8%] z-10">
          <div {...fx('spin')} className="wc h-full w-full">
            <div className="flex h-full w-full items-center justify-center rounded-[38%_62%_55%_45%/50%_40%_60%_50%] bg-fizz">
              <div {...fx('upright')} className="wc">
                <div {...fx('ten')} className="text-center">
                  <div className="ten-value font-extrabold leading-none">10X</div>
                  <div className="mt-1 text-[9px] font-bold tracking-[0.3em] md:text-xs">GROWTH</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FloatingPills />

        <svg
          {...fx('arrow')}
          aria-hidden="true"
          className="absolute right-[1%] top-[1%] z-30 w-8 md:w-12"
          viewBox="0 0 40 40"
        >
          <path
            {...fx('arrowpath')}
            d="M6 34 34 6M14 6h20v20"
            stroke="#111"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}
