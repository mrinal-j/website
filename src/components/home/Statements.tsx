import { useEffect, useRef, useState } from 'react'
import styles from './Statements.module.css'

const words = 'I design at the intersection of research, strategy, and impact, focused on problems where good design can help business growth and social impact reinforce each other.'.split(' ')

export function Statements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [revealCount, setRevealCount] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      // Start revealing when section enters viewport, finish when it's centered
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight * 1.2)))
      setRevealCount(Math.floor(progress * words.length))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="statements" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <p className={styles.text}>
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={styles.word}
              style={{
                opacity: i < revealCount ? 1 : 0.15,
                transform: i < revealCount ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
