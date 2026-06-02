import { useEffect, useState } from 'react'
import {
  EditableImage,
  EditableProvider,
  EditableText,
} from '~/components/editable/Editable'
import { EditPanel } from '~/components/editable/EditPanel'
import styles from './AboutDesktop.module.css'

const INTRO_TEXT =
  "I'm Mrinal, a designer and strategist. I work across research, strategy and design on problems that matter, where design can genuinely change how people think, act, and experience the world around them."
const TYPING_SPEED = 22

/** Locked-in default sizes for the photo frame. */
const IMAGE_DEFAULTS = { width: 310, height: 397, radius: 10, posX: 50, posY: 70 }
/** Locked-in default sizes for the intro text box. */
const TEXT_DEFAULTS = { fontSize: 15, width: 311, height: 40 }

/** Desktop-style "shortcut" icons scattered around the screen. */
const ICONS: {
  label: string
  /** Center position as percentages of the screen, [left, top]. */
  pos: [number, number]
  icon: React.ReactNode
}[] = [
  {
    label: 'Professional Experience',
    pos: [22, 44],
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
        <path d="M9 2a2 2 0 0 0-2 2v2H3a1 1 0 0 0-1 1v3h20V7a1 1 0 0 0-1-1h-4V4a2 2 0 0 0-2-2H9Zm0 2h6v2H9V4Z" />
        <path d="M13 12v1h-2v-1H2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7h-9Z" />
      </svg>
    ),
  },
  {
    label: 'How I Work',
    pos: [80, 40],
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
        <path d="M16.9 2.1a2.1 2.1 0 0 1 3 0l2 2a2.1 2.1 0 0 1 0 3l-1.4 1.4-5-5L16.9 2.1ZM14 4.5l5 5L8.3 20.2a2 2 0 0 1-.9.5l-4.2 1.1a.8.8 0 0 1-1-1l1.1-4.2a2 2 0 0 1 .5-.9L14 4.5Z" />
      </svg>
    ),
  },
  {
    label: 'Gallery',
    pos: [16, 72],
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" fillRule="evenodd">
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1.2 2.2v2h2v-2zm0 3.8v2h2V9zm0 3.8v2h2v-2zm0 3.8v2h2v-2zm11.6-11.4v2h2v-2zm0 3.8v2h2V9zm0 3.8v2h2v-2zm0 3.8v2h2v-2zM9 5.6h6v5H9zm0 7.8h6v5H9z" />
      </svg>
    ),
  },
  {
    label: 'Tool Stack',
    pos: [70, 74],
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
  },
]

/**
 * Frosted-glass skill capsules scattered around the photo frame. Positions
 * are percentages of the frame box, so edge values let a capsule spill
 * slightly over the photo for an organic, random look.
 */
const CAPSULES: { label: string; pos: [number, number] }[] = [
  { label: 'UX Research', pos: [24, 6] },
  { label: 'Service Design', pos: [84, 18] },
  { label: 'Brand Strategy', pos: [6, 42] },
  { label: 'Visual Design', pos: [94, 50] },
  { label: 'Product Design', pos: [22, 60] },
  { label: 'Design Strategy', pos: [80, 63] },
]

export function AboutDesktop() {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loaded) return
    if (typed.length < INTRO_TEXT.length) {
      const t = setTimeout(
        () => setTyped(INTRO_TEXT.slice(0, typed.length + 1)),
        TYPING_SPEED,
      )
      return () => clearTimeout(t)
    }
    setDone(true)
  }, [typed, loaded])

  return (
    <EditableProvider>
      <section className={styles.screen}>
        <div className={styles.center}>
          <div className={styles.frameCard}>
            <div className={styles.photoWrap}>
              <EditableImage
                id="about-photo"
                label="About photo"
                src="/images/about_image.webp"
                alt="Mrinal Jadhav"
                className={styles.aboutImage}
                defaults={IMAGE_DEFAULTS}
              />
              <span className={styles.statusPill} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2l2.4 6.5L21 11l-6.6 2.5L12 20l-2.4-6.5L3 11l6.6-2.5z" />
                </svg>
                Designer &amp; Strategist
              </span>
            </div>

            <div className={styles.captionBar}>
              <EditableText
                id="about-intro"
                label="Intro text"
                className={styles.intro}
                defaults={TEXT_DEFAULTS}
              >
                {typed}
                {!done && <span className={styles.caret} aria-hidden="true" />}
              </EditableText>
            </div>

            <div className={styles.capsuleRail}>
              {CAPSULES.map(cap => (
                <button
                  key={cap.label}
                  type="button"
                  className={styles.capsule}
                  style={{ left: `${cap.pos[0]}%`, top: `${cap.pos[1]}%` }}
                >
                  {cap.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.iconLayer}>
          {ICONS.map(item => (
            <button
              key={item.label}
              type="button"
              className={styles.item}
              style={
                {
                  '--x': `${item.pos[0]}%`,
                  '--y': `${item.pos[1]}%`,
                } as React.CSSProperties
              }
            >
              <span className={styles.tile} aria-hidden="true">
                <span className={styles.solidBox} />
                <span className={styles.glassBox} />
                <span className={styles.itemIcon}>{item.icon}</span>
              </span>
              <span className={styles.itemLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        {import.meta.env.DEV && <EditPanel />}
      </section>
    </EditableProvider>
  )
}
