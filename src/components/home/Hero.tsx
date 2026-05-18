import { useEffect, useRef, useState } from 'react'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
import styles from './Hero.module.css'
import { MeshGradient } from './MeshGradient'

const TYPING_SPEED = 65
const HERO_TEXT = "Hi, I'm Mrinal!"

const MESH_COLORS: [string, string, string, string, string, string] = [
  '#ffb375',
  '#ffd8b8',
  '#ff8e42',
  '#ffa270',
  '#ffcda3',
  '#f98c43',
]

export function Hero() {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const [darkOpacity, setDarkOpacity] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { fadeStyle } = useSectionFadeIn(containerRef)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loaded) return
    if (typed.length < HERO_TEXT.length) {
      const t = setTimeout(
        () => setTyped(HERO_TEXT.slice(0, typed.length + 1)),
        TYPING_SPEED,
      )
      return () => clearTimeout(t)
    }
    setDone(true)
  }, [typed, loaded])

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      const progress = Math.min(1, Math.max(0, window.scrollY / (vh * 0.8)))
      setDarkOpacity(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.sticky} style={fadeStyle}>
        <div className={`${styles.meshLayer} ${loaded ? styles.meshLayerVisible : ''}`}>
          <MeshGradient colors={MESH_COLORS} />
        </div>

        <div
          className={styles.darkOverlay}
          style={{ opacity: darkOpacity }}
          aria-hidden="true"
        />

        <div
          className={`${styles.content} ${loaded ? styles.contentVisible : ''}`}
          style={loaded ? { opacity: 1 - darkOpacity * 0.8 } : undefined}
        >
          <div className={styles.textBlock}>
            <p className={styles.heading}>
              {typed}
              {!done && <span className={styles.caret} aria-hidden="true" />}
            </p>
          </div>
        </div>

        <div className={styles.scrollArrow} style={{ opacity: done ? 1 - darkOpacity : 0 }}>
          <svg
            width="18"
            height="11"
            viewBox="0 0 22 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 2l9 10 9-10" />
          </svg>
        </div>
      </div>
    </div>
  )
}
