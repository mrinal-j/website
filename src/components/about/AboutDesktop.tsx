import { useEffect, useState } from 'react'
import styles from './AboutDesktop.module.css'

const INTRO_TEXT =
  "I'm Mrinal, a designer and strategist. I work across research, strategy and design on problems that matter, where design can genuinely change how people think, act, and experience the world around them."
const TYPING_SPEED = 22

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

/** Default sizes for the photo frame and intro text. */
const DEFAULT_SIZING = {
  imageWidth: 310,
  imageHeight: 397,
  radius: 10,
  posX: 50,
  posY: 70,
  textSize: 15,
  textWidth: 311,
  textHeight: 40,
}
const SIZING_KEY = 'aboutSizing'

export function AboutDesktop() {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [sizing, setSizing] = useState(DEFAULT_SIZING)

  // Load any saved sizes from a previous session.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIZING_KEY)
      if (saved) setSizing({ ...DEFAULT_SIZING, ...JSON.parse(saved) })
    } catch {
      /* ignore */
    }
  }, [])

  // Remember sizes between refreshes.
  useEffect(() => {
    try {
      localStorage.setItem(SIZING_KEY, JSON.stringify(sizing))
    } catch {
      /* ignore */
    }
  }, [sizing])

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
    <section className={styles.screen}>
      <div className={styles.center}>
        <img
          src="/images/about_image.webp"
          alt="Mrinal Jadhav"
          className={styles.aboutImage}
          style={{
            width: sizing.imageWidth,
            height: sizing.imageHeight,
            maxWidth: 'none',
            borderRadius: sizing.radius,
            objectPosition: `${sizing.posX}% ${sizing.posY}%`,
          }}
          loading="eager"
        />
        <p
          className={styles.intro}
          style={{
            fontSize: sizing.textSize,
            width: sizing.textWidth,
            maxWidth: '100%',
            height: sizing.textHeight,
          }}
        >
          {typed}
          {!done && <span className={styles.caret} aria-hidden="true" />}
        </p>
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

      {import.meta.env.DEV && (
        <SizingControls sizing={sizing} setSizing={setSizing} />
      )}
    </section>
  )
}

/** Dev-only panel to live-tweak the photo frame and text sizes. */
function SizingControls({
  sizing,
  setSizing,
}: {
  sizing: typeof DEFAULT_SIZING
  setSizing: React.Dispatch<React.SetStateAction<typeof DEFAULT_SIZING>>
}) {
  const set = (key: keyof typeof DEFAULT_SIZING) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setSizing(s => ({ ...s, [key]: Number(e.target.value) }))

  return (
    <div className={styles.controls}>
      <div className={styles.controlsTitle}>Size controls (only you see this)</div>

      <label className={styles.control}>
        <span>Frame width</span>
        <input type="range" min={120} max={520} value={sizing.imageWidth} onChange={set('imageWidth')} />
        <b>{sizing.imageWidth}px</b>
      </label>

      <label className={styles.control}>
        <span>Frame height</span>
        <input type="range" min={120} max={640} value={sizing.imageHeight} onChange={set('imageHeight')} />
        <b>{sizing.imageHeight}px</b>
      </label>

      <label className={styles.control}>
        <span>Frame roundness</span>
        <input type="range" min={0} max={48} value={sizing.radius} onChange={set('radius')} />
        <b>{sizing.radius}px</b>
      </label>

      <label className={styles.control}>
        <span>Move photo ←→</span>
        <input type="range" min={0} max={100} value={sizing.posX} onChange={set('posX')} />
        <b>{sizing.posX}%</b>
      </label>

      <label className={styles.control}>
        <span>Move photo ↑↓</span>
        <input type="range" min={0} max={100} value={sizing.posY} onChange={set('posY')} />
        <b>{sizing.posY}%</b>
      </label>

      <label className={styles.control}>
        <span>Text size</span>
        <input type="range" min={12} max={28} value={sizing.textSize} onChange={set('textSize')} />
        <b>{sizing.textSize}px</b>
      </label>

      <label className={styles.control}>
        <span>Text box width</span>
        <input type="range" min={200} max={680} value={sizing.textWidth} onChange={set('textWidth')} />
        <b>{sizing.textWidth}px</b>
      </label>

      <label className={styles.control}>
        <span>Text box height</span>
        <input type="range" min={40} max={320} value={sizing.textHeight} onChange={set('textHeight')} />
        <b>{sizing.textHeight}px</b>
      </label>

      <button
        type="button"
        className={styles.controlsReset}
        onClick={() => setSizing(DEFAULT_SIZING)}
      >
        Reset to default
      </button>
    </div>
  )
}
