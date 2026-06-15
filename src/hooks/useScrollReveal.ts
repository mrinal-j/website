import type { RefObject } from 'react'
import { useEffect } from 'react'

/**
 * Scroll-triggered reveal: fades and rises each direct-child <section> of the
 * given container as it enters the viewport. Pair with the global `reveal-root`
 * class on the same container (styles live in globals.css).
 *
 * Sections reveal once (no fade-out on the way back up) and the whole effect is
 * skipped for visitors who prefer reduced motion.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const sections = Array.from(
      root.querySelectorAll(':scope > section'),
    ) as HTMLElement[]

    // Reduced-motion: show everything immediately, no animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((el) => el.classList.add('is-revealed'))
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
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref])
}
