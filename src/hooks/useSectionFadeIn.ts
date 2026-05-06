import type { CSSProperties, RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

export function useSectionFadeIn(sectionRef: RefObject<HTMLElement | null>): {
  fadeIn: number
  fadeStyle: CSSProperties
} {
  const [fadeIn, setFadeIn] = useState(0)
  const locked = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      // Once fully faded in, lock it — no fade-out
      if (locked.current) return

      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Fade starts when the section's top enters the bottom of the viewport,
      // and finishes when it's about 40% up the screen.
      // rect.top = vh → progress 0 (just peeking in)
      // rect.top = vh * 0.4 → progress 1 (fully visible)
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.6)))

      if (progress >= 1) locked.current = true
      setFadeIn(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRef])

  const fadeStyle: CSSProperties = {
    opacity: fadeIn,
    transform: `translateY(${(1 - fadeIn) * 12}px)`,
  }

  return { fadeIn, fadeStyle }
}
