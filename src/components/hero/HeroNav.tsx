import { fx } from '../../animations/hooks'
import { NAV_LINKS } from '../../data/content'
import LogoMark from '../LogoMark'

/** Logo, primary links and the header call to action. */
export default function HeroNav() {
  return (
    <header {...fx('nav')} className="flex shrink-0 items-center justify-between gap-4 py-4 md:py-5">
      <a href="#top" className="flex min-h-11 items-center gap-2 font-extrabold">
        <LogoMark />
        ITZFIZZ
      </a>
      <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-semibold md:flex">
        {NAV_LINKS.map((label) => (
          <a key={label} href="#top" className="nav-link relative inline-flex min-h-11 items-center px-1.5">
            {label}
            <span aria-hidden="true" className="nav-line absolute inset-x-0 bottom-2.5 h-0.5 bg-ink" />
          </a>
        ))}
      </nav>
      <a href="#top" {...fx('cta')} className="btn btn-ink text-sm">
        GET STARTED
      </a>
    </header>
  )
}
