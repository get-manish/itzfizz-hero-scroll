/**
 * Single registry of GSAP targets.
 *
 * Every node an animation touches carries `data-fx="<name>"`. Components add it
 * with `{...fx('name')}` and animation modules read it back with `all()` /
 * `one()`, so no selector string is written anywhere else in the code base.
 */
export type Fx =
  | 'bg' | 'dots' | 'ptr' | 'nav' | 'cta' | 'eyebrow'
  | 'layer' | 'headline' | 'word' | 'letter' | 'body' | 'copy' | 'point' | 'pointmark'
  | 'stat' | 'count' | 'rule' | 'stagenum'
  | 'visualbox' | 'visual' | 'deco' | 'core' | 'spin' | 'upright' | 'ten' | 'arrow' | 'arrowpath'
  | 'pills' | 'pill' | 'pillfill'
  | 'tab' | 'tabmark' | 'tabcap' | 'progress'

/** Spread onto a JSX element: `<div {...fx('core')} />`. */
export const fx = (name: Fx): { readonly 'data-fx': Fx } => ({ 'data-fx': name })

const selector = (name: Fx): string => `[data-fx="${name}"]`

/** Every `data-fx` match under `scope`, in document order. */
export const all = <T extends Element = HTMLElement>(scope: ParentNode, name: Fx): T[] =>
  Array.from(scope.querySelectorAll<T>(selector(name)))

/** First `data-fx` match under `scope`, or null. */
export const one = <T extends Element = HTMLElement>(scope: ParentNode, name: Fx): T | null =>
  scope.querySelector<T>(selector(name))
