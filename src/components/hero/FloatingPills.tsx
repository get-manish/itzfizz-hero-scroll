import { fx } from '../../animations/hooks'
import { PILLS } from '../../data/pills'

/**
 * The pills' own layer.
 *
 * It is a sibling that comes AFTER the core in the DOM and carries a fixed
 * z-index that no timeline touches, so the pills paint above the core at every
 * stage and breakpoint. Each pill is a zero-size anchor at the layer centre
 * (GSAP owns its x, y and scale); the label inside is centred on the anchor
 * with plain CSS, so GSAP never has to know the label size.
 *
 * Below 768px the layer is wider than the square artwork box (see .pills-layer
 * in index.css) because the artwork has its own full-width row on a phone; the
 * pills then circle the core on a wide ellipse instead of piling onto it.
 */
export default function FloatingPills() {
  return (
    <div {...fx('pills')} className="pills-layer pointer-events-none absolute inset-y-0 left-1/2 z-20 -translate-x-1/2">
      {PILLS.map((pill) => (
        <span
          key={pill.id}
          {...fx('pill')}
          data-pill={pill.id}
          className="absolute left-1/2 top-1/2 h-0 w-0"
        >
          <span className="pill absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap rounded-full border-2 border-ink bg-white px-3 py-1 text-[11px] font-bold max-[479px]:px-2 max-[479px]:py-0.5 max-[479px]:text-[10px] md:text-sm">
            <span {...fx('pillfill')} aria-hidden="true" className="absolute inset-0 bg-fizz opacity-0" />
            <span className="relative">{pill.label}</span>
          </span>
        </span>
      ))}
    </div>
  )
}
