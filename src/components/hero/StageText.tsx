import { fx } from '../../animations/hooks'
import type { Stage } from '../../data/stages'

/** The stage paragraph: the full text from 768px up, the one-liner below. */
export default function StageText({ stage }: { readonly stage: Stage }) {
  const { text, short } = stage.description
  return (
    <p {...fx('copy')} className="mt-3 max-w-sm text-sm text-[#5A5A5A] md:mt-4 md:max-w-md md:text-base">
      {text === short ? (
        text
      ) : (
        <>
          <span className="md:hidden">{short}</span>
          <span className="hidden md:inline">{text}</span>
        </>
      )}
    </p>
  )
}
