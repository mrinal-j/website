import { useEffect, useRef, useState } from 'react'
import styles from './Statements.module.css'

const words =
  'I design at the intersection of research, strategy, and impact, focused on problems where good design can help business growth and social impact reinforce each other.'.split(
    ' ',
  )

const HIGHLIGHT_WORDS = new Set([4, 5, 6, 7, 8, 9])

const WORD_INTERVAL = 120

const PLACEHOLDER_IMAGES = [
  { id: 1, color: '#e8e4df' },
  { id: 2, color: '#d9d2c9' },
  { id: 3, color: '#c9c1b6' },
  { id: 4, color: '#e0dbd4' },
  { id: 5, color: '#d3cdc5' },
]

export function Statements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [revealCount, setRevealCount] = useState(0)
  const [fadeIn, setFadeIn] = useState(0)
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let interval: ReturnType<typeof setInterval> | null = null
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          let i = 0
          interval = setInterval(() => {
            i += 1
            setRevealCount(i)
            if (i >= words.length && interval) {
              clearInterval(interval)
              interval = null
            }
          }, WORD_INTERVAL)
          observer.disconnect()
        }
      },
      { threshold: 0.05 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (interval) clearInterval(interval)
    }
  }, [])

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
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) {
              setVisibleImages((prev) => new Set(prev).add(idx))
            }
          }
        })
      },
      { threshold: 0.2 },
    )
    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="statements" ref={sectionRef} className={styles.section}>
      <div
        className={styles.layout}
        style={{ opacity: fadeIn, transform: `translateY(${(1 - fadeIn) * 30}px)` }}
      >
        <div className={styles.textCol}>
          <div className={styles.textSticky}>
            <p className={styles.text}>
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`${styles.word} ${HIGHLIGHT_WORDS.has(i) ? styles.highlight : ''}`}
                  style={{
                    opacity: i < revealCount ? 1 : 0.12,
                    transform: i < revealCount ? 'translateY(0)' : 'translateY(8px)',
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className={styles.imageCol}>
          {PLACEHOLDER_IMAGES.map((img, idx) => (
            <div
              key={img.id}
              ref={(el) => { imageRefs.current[idx] = el }}
              className={`${styles.imageCard} ${visibleImages.has(idx) ? styles.imageCardVisible : ''}`}
              style={{ backgroundColor: img.color }}
            >
              <span className={styles.imagePlaceholder}>{img.id}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
