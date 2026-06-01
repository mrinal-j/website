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
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: 'How I Work',
    pos: [80, 40],
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    label: 'Gallery',
    pos: [16, 72],
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M7 3v18M17 3v18M2 9h5M2 15h5M17 9h5M17 15h5" />
      </svg>
    ),
  },
  {
    label: 'Tool Stack',
    pos: [70, 74],
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18l3 3 6.4-6.3a4 4 0 0 0 5.3-5.4l-2.8 2.8-2.1-2.1 2.9-2.7Z" />
      </svg>
    ),
  },
]

/** Floating capsule buttons. Placeholder text for now. */
const CAPSULES: { label: string; pos: [number, number] }[] = [
  { label: 'xx', pos: [33, 30] },
  { label: 'xx', pos: [58, 30] },
  { label: 'xx', pos: [67, 42] },
  { label: 'xx', pos: [60, 52] },
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
          <EditableImage
            id="about-photo"
            label="About photo"
            src="/images/about_image.webp"
            alt="Mrinal Jadhav"
            className={styles.aboutImage}
            defaults={IMAGE_DEFAULTS}
          />
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

        {ICONS.map(item => (
          <button
            key={item.label}
            type="button"
            className={styles.item}
            style={{ left: `${item.pos[0]}%`, top: `${item.pos[1]}%` }}
          >
            <span className={styles.itemIcon}>{item.icon}</span>
            <span className={styles.itemLabel}>{item.label}</span>
          </button>
        ))}

        {CAPSULES.map((cap, i) => (
          <button
            key={i}
            type="button"
            className={styles.capsule}
            style={{ left: `${cap.pos[0]}%`, top: `${cap.pos[1]}%` }}
          >
            {cap.label}
          </button>
        ))}

        {import.meta.env.DEV && <EditPanel />}
      </section>
    </EditableProvider>
  )
}
