import { fx } from '../../animations/hooks'
import type { Stage } from '../../data/stages'

interface Props {
  readonly stage: Stage
  readonly level: 'h1' | 'h2'
  /** Split each word into letters (the load-in animates letter by letter). */
  readonly letters?: boolean
  /** One word per line instead of flowing text. */
  readonly stacked?: boolean
}

interface WordsProps {
  readonly text: string
  readonly letters: boolean
  readonly stacked: boolean
}

/** Words are always rendered by React, so the reveal never rewrites the DOM. */
function Words({ text, letters, stacked }: WordsProps) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={stacked ? 'block' : undefined}>
          <span {...fx('word')} className={stacked ? 'block' : 'inline-block'}>
            <span className={i === words.length - 1 ? 'mark-y' : undefined}>
              {letters
                ? Array.from(word).map((ch, j) => (
                    <span key={j} className="char">
                      <span {...fx('letter')} className="char-in">
                        {ch}
                      </span>
                    </span>
                  ))
                : word}
            </span>
          </span>
          {i < words.length - 1 && !stacked ? ' ' : null}
        </span>
      ))}
    </>
  )
}

/** The stage headline. Below 768px the shorter `short` form is shown. */
export default function Headline({ stage, level, letters = false, stacked = false }: Props) {
  const { text, short } = stage.headline
  const Tag = level
  const compact = short !== text
  return (
    <Tag {...fx('headline')} aria-label={text} className="h1 font-extrabold uppercase">
      <span aria-hidden="true" className={compact ? 'hidden md:inline' : undefined}>
        <Words text={text} letters={letters} stacked={stacked} />
      </span>
      {compact ? (
        <span aria-hidden="true" className="md:hidden">
          <Words text={short} letters={letters} stacked={stacked} />
        </span>
      ) : null}
    </Tag>
  )
}
