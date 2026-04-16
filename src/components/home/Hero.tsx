import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const subtitles = [
  'solutions that scale impact.',
  'communities.',
  'interventions that matter.',
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const totalScroll = container.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Map scroll progress to animation phases
  const phase1End = 0.15 // "Hi, I'm Mrinal" visible
  const phase2Start = 0.15
  const phase2End = 0.3 // Transition to "I design with empathy"
  const subtitleCycleStart = 0.35
  const subtitleCycleDuration = 0.65 / subtitles.length

  const hiOpacity = scrollProgress < phase2Start
    ? 1
    : Math.max(0, 1 - (scrollProgress - phase2Start) / (phase2End - phase2Start))
  const hiTranslateY = scrollProgress < phase2Start
    ? 0
    : -(scrollProgress - phase2Start) / (phase2End - phase2Start) * 20

  const designOpacity = scrollProgress < phase2Start
    ? 0
    : scrollProgress < phase2End
      ? (scrollProgress - phase2Start) / (phase2End - phase2Start)
      : 1
  const designTranslateY = scrollProgress < phase2Start
    ? 20
    : scrollProgress < phase2End
      ? 20 - (scrollProgress - phase2Start) / (phase2End - phase2Start) * 20
      : 0

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <div className={styles.content}>
          {/* Phase 1: Hi, I'm Mrinal */}
          <div
            className={styles.textBlock}
            style={{
              opacity: hiOpacity,
              transform: `translateY(calc(-50% + ${hiTranslateY}px))`,
            }}
          >
            <p className={styles.heading}>Hi, I'm Mrinal.</p>
          </div>

          {/* Phase 2: I design with empathy for... */}
          <div
            className={styles.textBlock}
            style={{
              opacity: designOpacity,
              transform: `translateY(calc(-50% + ${designTranslateY}px))`,
            }}
          >
            <p className={styles.heading}>I design with empathy for</p>
            <div className={styles.subtitleContainer}>
              {subtitles.map((text, i) => {
                const start = subtitleCycleStart + i * subtitleCycleDuration
                const fadeIn = start
                const peak = start + subtitleCycleDuration * 0.3
                const fadeOut = start + subtitleCycleDuration * 0.8
                const end = start + subtitleCycleDuration

                let opacity = 0
                let translateY = 20
                if (scrollProgress >= fadeIn && scrollProgress < peak) {
                  const t = (scrollProgress - fadeIn) / (peak - fadeIn)
                  opacity = t
                  translateY = 20 * (1 - t)
                } else if (scrollProgress >= peak && scrollProgress < fadeOut) {
                  opacity = 1
                  translateY = 0
                } else if (scrollProgress >= fadeOut && scrollProgress < end) {
                  const t = (scrollProgress - fadeOut) / (end - fadeOut)
                  opacity = 1 - t
                  translateY = -10 * t
                }
                // Keep last subtitle visible
                if (i === subtitles.length - 1 && scrollProgress >= peak) {
                  opacity = 1
                  translateY = 0
                }

                return (
                  <p
                    key={text}
                    className={styles.subtitle}
                    style={{ opacity, transform: `translateY(${translateY}px)` }}
                  >
                    {text}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll arrow */}
        <div className={styles.scrollArrow} style={{ opacity: scrollProgress < 0.1 ? 1 : 0 }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4v16M2 14l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
