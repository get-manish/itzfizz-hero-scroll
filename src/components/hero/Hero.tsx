import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsapSetup'
import { heroIntro } from '../../animations/heroIntro'
import { heroPointer } from '../../animations/heroPointer'
import { heroScroll } from '../../animations/heroScroll'
import { heroSpin } from '../../animations/heroSpin'
import HeroBackground from './HeroBackground'
import HeroNav from './HeroNav'
import HeroVisual from './HeroVisual'
import StageContent from './StageContent'
import StageTabs from './StageTabs'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    /* The one gsap.context; the function it returns runs on ctx.revert(). */
    const ctx = gsap.context(() => {
      const stops = [heroSpin(root), heroPointer(root), heroScroll(root)]
      heroIntro(root)
      return () => stops.forEach((stop) => stop())
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="hero relative isolate w-full bg-cream">
      <HeroBackground />
      <div className="hero-shell relative z-10 mx-auto w-full max-w-344 px-5 md:px-8">
        <HeroNav />
        <div className="hero-grid">
          <StageContent />
          <HeroVisual />
        </div>
        <StageTabs />
      </div>
    </section>
  )
}
