import type { RefObject } from 'react'
import { useEffect } from 'react'

// Stable reference so the default doesn't re-trigger the effect each render.
const DEFAULT_SELECTORS = [':scope > section']

type ScrollRevealOptions = {
  /**
   * CSS selectors (relative to the container, so they may start with `:scope`)
   * for the elements to reveal. Defaults to the container's direct-child
   * <section>s — i.e. a whole-section reveal.
   */
  selectors?: string[]
  /** Per-sibling stagger in ms, so items sharing a parent cascade. 0 = off. */
  stagger?: number
  /** Cap on the staggered delay, in ms. */
  staggerMax?: number
}

/**
 * Scroll-triggered reveal: fades (and, depending on the CSS, rises) the matched
 * elements as they enter the viewport. Pair with a `reveal-root` / `reveal-fine`
 * class on the container — the matching styles live in globals.css and define
 * the hidden start state so there is no flash before this hook runs.
 *
 * Each element reveals once and the whole effect is skipped for visitors who
 * prefer reduced motion.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  const { selectors = DEFAULT_SELECTORS, stagger = 0, staggerMax = 300 } = options

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const elements: HTMLElement[] = []
    selectors.forEach((selector) => {
      root.querySelectorAll(selector).forEach((el) => elements.push(el as HTMLElement))
    })
    if (elements.length === 0) return

    // Stagger siblings that share a parent so rows of cards cascade in.
    if (stagger > 0) {
      const indexByParent = new Map<Element, number>()
      elements.forEach((el) => {
        const parent = el.parentElement
        if (!parent) return
        const i = indexByParent.get(parent) ?? 0
        el.style.transitionDelay = `${Math.min(i * stagger, staggerMax)}ms`
        indexByParent.set(parent, i + 1)
      })
    }

    // Reduced-motion: show everything immediately, no animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => {
        el.style.transitionDelay = ''
        el.classList.add('is-revealed')
      })
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target) // reveal once, then stop watching
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref, selectors, stagger, staggerMax])
}
