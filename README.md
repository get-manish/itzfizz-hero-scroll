# Itzfizz Scroll-Driven Hero
React 18 + TypeScript (strict) + Vite + Tailwind 3 + GSAP/ScrollTrigger. One pinned hero tells a five-stage story as you scroll; the yellow core, the pills and the background stay the same objects while the main content swaps per stage.

## Run
`npm install && npm run dev` · `npm run build` · `npm run lint`

## Structure
- `src/components/hero/` — `Hero` (composition + the one `gsap.context`), `HeroNav`, `HeroBackground`, `StageContent` > `IntroStage` / `StageBody` (+ `Headline`, `StageText`, `StageNumber`, `HeroStats`), `HeroVisual` > `FloatingPills`, `StageTabs` > `ProgressBar`.
- `src/animations/` — `heroIntro` (load-in), `heroScroll` (the ONE pinned ScrollTrigger), `heroStages` (content hand-over timeline), `heroParallax` (depth layers), `heroSpin`, `heroPointer`, `pillLayout`, `motion` (per-breakpoint numbers), `hooks` (the `data-fx` registry).
- `src/data/` — `stages.ts`, `pills.ts`, `content.ts`, all typed. Every stage string carries a comment naming the itzfizz.com section it comes from.

## Animation rules
- GSAP targets are found through `data-fx="..."` only (`fx()` in JSX, `all()`/`one()` in animation code). No scattered selectors.
- Only transform, opacity, clip-path and stroke-dashoffset are animated.
- No two tweens own the same property on the same element. The scroll timeline owns the outer core; the idle spin owns an inner wrapper; the pills' x/y are written by `quickSetter` and their scale/opacity by separate tweens.
- Stage layers are all in the DOM, stacked in one grid cell. Scrolling only fades/clips them. Inactive layers are `inert`.
- Reduced motion: nothing is pinned, scrubbed or spun. The five stages render as normal stacked content.

## Deploy (GitHub Pages)
Push to `main`, then in Settings > Pages choose "GitHub Actions". `base: './'` keeps asset paths valid under a repo subpath.

## Research
Content from itzfizz.com. The supplied car-scroll URL was an interaction reference only; none of its assets or code were used. The 93% figure is from itzfizz.com; the two "100%" stats describe this build, not Itzfizz.
