import type { CSSProperties, RefObject } from 'react'
import { useEffect, useState } from 'react'

export function useSectionFadeIn(sectionRef: RefObject<HTMLElement | null>): {
  fadeIn: number
  fadeStyle: CSSProperties
} {
  const [fadeIn, setFadeIn] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(1, Math.max(0, 1 - rect.top / (vh * 0.5)))
      setFadeIn(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRef])

  const fadeStyle: CSSProperties = {
    opacity: fadeIn,
    transform: `translateY(${(1 - fadeIn) * 30}px)`,
  }

  return { fadeIn, fadeStyle }
}
