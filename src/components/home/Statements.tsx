import { useEffect, useRef, useState } from 'react'
import styles from './Statements.module.css'

const words = 'I design at the intersection of research, strategy, and impact, focused on problems where good design can help business growth and social impact reinforce each other.'.split(' ')

// How fast the words appear one-by-one when the reveal is triggered.
// Lower number = faster. 60ms × ~30 words ≈ 1.8s total.
const WORD_INTERVAL = 140

export function Statements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [revealCount, setRevealCount] = useState(0)

  // Word-by-word reveal is triggered externally (by the Hero's split-fade
  // sequence). Until the Hero fires the 'statements:reveal' event, all words
  // stay hidden — even though the page may have already been scrolled to this
  // section behind the orange overlay.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    const handler = () => {
      if (interval) clearInterval(interval)
      setRevealCount(0)
      let i = 0
      interval = setInterval(() => {
        i += 1
        setRevealCount(i)
        if (i >= words.length && interval) {
          clearInterval(interval)
          interval = null
        }
      }, WORD_INTERVAL)
    }
    window.addEventListener('statements:reveal', handler)
    return () => {
      window.removeEventListener('statements:reveal', handler)
      if (interval) clearInterval(interval)
    }
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
