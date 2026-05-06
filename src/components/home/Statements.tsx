import { useEffect, useRef, useState, useCallback } from 'react'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
import styles from './Statements.module.css'

const words =
  'I design at the intersection of research, strategy, and impact, focused on problems where good design can help business growth and social impact reinforce each other.'.split(
    ' ',
  )

const HIGHLIGHT_WORDS = new Set([4, 5, 6, 7, 8, 9])
const WORD_INTERVAL = 120

// `position` controls which part of the image is visible when it's cropped.
// Examples: 'center' (default), 'left center', 'right center',
//           'center top', 'center bottom', '30% 50%', etc.
// `zoom` scales the image inside the card. 1 = normal, 1.5 = 50% zoomed in, etc.
const STATEMENT_IMAGES = [
  { id: 1, src: '/images/statement_1.JPG', position: 'center', zoom: 1 },
  { id: 4, src: '/images/statement_4.png', position: 'center', zoom: 1 },
  { id: 3, src: '/images/statement_3.png', position: '45% center', zoom: 1 },
  { id: 2, src: '/images/statement_2 test.jpg', position: '20% center', zoom: 1.3 },
  { id: 5, src: '/images/statement_5.jpg', position: '65% center', zoom: 1 },
  { id: 6, src: '/images/statement_6.png', position: 'center', zoom: 1 },
]

const leftCol = STATEMENT_IMAGES.filter((_, i) => i % 2 === 0)
const rightCol = STATEMENT_IMAGES.filter((_, i) => i % 2 === 1)

export function Statements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [revealCount, setRevealCount] = useState(0)
  const { fadeStyle } = useSectionFadeIn(sectionRef)
  const [leftY, setLeftY] = useState(0)
  const [rightY, setRightY] = useState(0)
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

  const onScroll = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      return
    }
    const section = sectionRef.current
    const leftEl = leftRef.current
    const rightEl = rightRef.current
    if (!section || !leftEl || !rightEl) return

    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight

    const visibleHeight = vh - 200
    const leftOverflow = Math.max(0, leftEl.scrollHeight - visibleHeight)
    const rightOverflow = Math.max(0, rightEl.scrollHeight - visibleHeight)

    const sectionHeight = section.offsetHeight - vh
    const scrolled = Math.max(0, -rect.top)
    const progress = sectionHeight > 0 ? Math.min(1, scrolled / sectionHeight) : 0

    setLeftY(-progress * leftOverflow)
    setRightY(-rightOverflow + progress * rightOverflow)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

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
      <div ref={stickyRef} className={styles.sticky}>
        <div
          className={styles.layout}
          style={fadeStyle}
        >
          <div className={styles.textCol}>
            <p ref={textRef} className={styles.text}>
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
          <div className={styles.imageCol}>
            <div
              ref={leftRef}
              className={styles.imageSubCol}
              style={{ transform: `translateY(${leftY}px)` }}
            >
              {leftCol.map((img) => {
                const idx = STATEMENT_IMAGES.indexOf(img)
                return (
                  <div
                    key={img.id}
                    ref={(el) => { imageRefs.current[idx] = el }}
                    className={`${styles.imageCard} ${visibleImages.has(idx) ? styles.imageCardVisible : ''}`}
                  >
                    <img src={img.src} alt="" className={styles.cardImage} style={{ objectPosition: img.position, transform: `scale(${img.zoom})` }} />
                  </div>
                )
              })}
            </div>
            <div
              ref={rightRef}
              className={styles.imageSubCol}
              style={{ transform: `translateY(${rightY}px)` }}
            >
              {rightCol.map((img) => {
                const idx = STATEMENT_IMAGES.indexOf(img)
                return (
                  <div
                    key={img.id}
                    ref={(el) => { imageRefs.current[idx] = el }}
                    className={`${styles.imageCard} ${visibleImages.has(idx) ? styles.imageCardVisible : ''}`}
                  >
                    <img src={img.src} alt="" className={styles.cardImage} style={{ objectPosition: img.position, transform: `scale(${img.zoom})` }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
