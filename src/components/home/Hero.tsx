import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'
import { MeshGradient, type MeshGradientHandle } from './MeshGradient'

// ─────────────────────────────────────────────────────────────
// TIMING CONTROLS (all values in milliseconds)
// Adjust these numbers to speed up or slow down the animation.
// ─────────────────────────────────────────────────────────────
const TYPING_SPEED = 70          // delay between each character as it types
const BACKSPACE_SPEED = 70       // delay between each character as it erases (both the "Hi" line and subtitles)
const PAUSE_AFTER_HI = 900       // how long "Hi, I'm Mrinal." stays fully typed before it starts backspacing
const PAUSE_AFTER_ERASE = 500    // breath after the "Hi" line is fully erased, before "I design…" starts typing
const PAUSE_BEFORE_SUBTITLES = 250 // pause after "I design with empathy for" finishes typing
const SUBTITLE_HOLD = 1400       // how long each subtitle stays fully visible before it backspaces

// ── Split + fade transition to Statements ─────────────────────
const PAUSE_BEFORE_SPLIT = 1200  // how long the final subtitle sits before the mesh starts splitting
const TEXT_FADE_DURATION = 350   // how quickly the text fades out just before the split begins
const SPLIT_DURATION = 1100      // how long the two halves take to slide apart (keep in sync with Hero.module.css .splitPanel)
const ORANGE_HOLD = 400          // how long the full orange screen lingers before we cross-fade to Statements
const FADE_DURATION = 700        // how long the orange takes to fade out revealing the Statements section (sync with .fadeOverlay keyframes)
// ─────────────────────────────────────────────────────────────

// ── Mesh gradient palette (6 colours). Edit any hex to recolour the background. ──
const MESH_COLORS: [string, string, string, string, string, string] = [
  '#ffb375',
  '#ffd8b8',
  '#ff8e42',
  '#ffa270',
  '#ffcda3',
  '#f98c43',
]

const HI_TEXT = "Hi, I'm Mrinal."
const DESIGN_TEXT = 'I design with empathy for'
const subtitles = [
  'solutions that scale impact.',
  'communities.',
  'interventions that matter.',
]

type TransitionPhase = 'idle' | 'textFade' | 'splitting' | 'fading' | 'done'

export function Hero() {
  // Phases: 'hi-typing' → 'hi-erasing' → 'design-typing' → 'design-done'
  const [hiTyped, setHiTyped] = useState('')
  const [phase, setPhase] = useState<'hi-typing' | 'hi-erasing' | 'design-typing' | 'design-done'>('hi-typing')
  const [designTyped, setDesignTyped] = useState('')
  const [subtitleIndex, setSubtitleIndex] = useState(-1)
  const [subtitleTyped, setSubtitleTyped] = useState('')
  const [isErasing, setIsErasing] = useState(false)
  const [transition, setTransition] = useState<TransitionPhase>('idle')
  const [meshSnapshot, setMeshSnapshot] = useState<string | null>(null)
  // Separate flag that flips to true AFTER the halves have rendered in their
  // closed position — gives the browser something to transition FROM.
  const [halvesOpen, setHalvesOpen] = useState(false)

  const meshRef = useRef<MeshGradientHandle>(null)

  const showDesign = phase === 'design-typing' || phase === 'design-done'
  const designDone = phase === 'design-done'

  // Phase 1: Type "Hi, I'm Mrinal." → hold → backspace it away
  useEffect(() => {
    if (phase === 'hi-typing') {
      if (hiTyped.length < HI_TEXT.length) {
        const t = setTimeout(
          () => setHiTyped(HI_TEXT.slice(0, hiTyped.length + 1)),
          TYPING_SPEED,
        )
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('hi-erasing'), PAUSE_AFTER_HI)
      return () => clearTimeout(t)
    }

    if (phase === 'hi-erasing') {
      if (hiTyped.length > 0) {
        const t = setTimeout(
          () => setHiTyped(hiTyped.slice(0, -1)),
          BACKSPACE_SPEED,
        )
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('design-typing'), PAUSE_AFTER_ERASE)
      return () => clearTimeout(t)
    }
  }, [phase, hiTyped])

  // Phase 2: Type "I design with empathy for"
  useEffect(() => {
    if (phase !== 'design-typing') return
    if (designTyped.length < DESIGN_TEXT.length) {
      const t = setTimeout(
        () => setDesignTyped(DESIGN_TEXT.slice(0, designTyped.length + 1)),
        TYPING_SPEED,
      )
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase('design-done'), PAUSE_BEFORE_SUBTITLES)
    return () => clearTimeout(t)
  }, [phase, designTyped])

  useEffect(() => {
    if (designDone && subtitleIndex === -1) setSubtitleIndex(0)
  }, [designDone, subtitleIndex])

  useEffect(() => {
    if (subtitleIndex < 0 || subtitleIndex >= subtitles.length) return
    const current = subtitles[subtitleIndex]

    if (!isErasing) {
      if (subtitleTyped.length < current.length) {
        const t = setTimeout(
          () => setSubtitleTyped(current.slice(0, subtitleTyped.length + 1)),
          TYPING_SPEED,
        )
        return () => clearTimeout(t)
      }
      if (subtitleIndex === subtitles.length - 1) return
      const t = setTimeout(() => setIsErasing(true), SUBTITLE_HOLD)
      return () => clearTimeout(t)
    }

    if (subtitleTyped.length > 0) {
      const t = setTimeout(
        () => setSubtitleTyped(subtitleTyped.slice(0, -1)),
        BACKSPACE_SPEED,
      )
      return () => clearTimeout(t)
    }
    setIsErasing(false)
    setSubtitleIndex(subtitleIndex + 1)
  }, [subtitleIndex, subtitleTyped, isErasing])

  const subtitleActive =
    subtitleIndex >= 0 && subtitleIndex < subtitles.length
  const subtitleCurrentDone =
    subtitleActive && subtitleTyped.length === subtitles[subtitleIndex].length
  const subtitleIsLast =
    subtitleActive && subtitleIndex === subtitles.length - 1

  // Kick off the split transition once the final subtitle finishes typing
  useEffect(() => {
    if (transition !== 'idle') return
    if (!(subtitleIsLast && subtitleCurrentDone)) return
    const t = setTimeout(() => setTransition('textFade'), PAUSE_BEFORE_SPLIT)
    return () => clearTimeout(t)
  }, [transition, subtitleIsLast, subtitleCurrentDone])

  useEffect(() => {
    if (transition === 'textFade') {
      const t = setTimeout(() => {
        // Take a snapshot of the live mesh right as the split starts, so the
        // two halves that slide apart show the exact same pixels as the live
        // mesh the user was just watching.
        const snap = meshRef.current?.snapshot() ?? null
        setMeshSnapshot(snap)
        setTransition('splitting')
      }, TEXT_FADE_DURATION)
      return () => clearTimeout(t)
    }
    if (transition === 'splitting') {
      // First paint the halves in their closed position, then on the NEXT
      // animation frame flip them to open. Without this the browser has no
      // "from" state to transition from and the slide never plays.
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setHalvesOpen(true))
      })
      const t = setTimeout(() => {
        document.getElementById('statements')?.scrollIntoView({ behavior: 'auto', block: 'start' })
        setTransition('fading')
      }, SPLIT_DURATION + ORANGE_HOLD)
      return () => {
        cancelAnimationFrame(raf1)
        clearTimeout(t)
      }
    }
    if (transition === 'fading') {
      // Start the Statements word-by-word reveal partway through the orange
      // fade, so the first words appear as the overlay clears.
      const revealTrigger = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('statements:reveal'))
      }, FADE_DURATION * 0.4)
      const t = setTimeout(() => setTransition('done'), FADE_DURATION)
      return () => {
        clearTimeout(t)
        clearTimeout(revealTrigger)
      }
    }
  }, [transition])

  const textHidden = transition !== 'idle'
  const isSplitting = transition === 'splitting' || transition === 'fading' || transition === 'done'
  const showOverlay = transition === 'fading'

  // During the split, we show two <div>s with the snapshot image as the
  // background. Each is clipped to its half and translates away from centre.
  const halvesStyle = meshSnapshot ? { backgroundImage: `url(${meshSnapshot})` } : undefined

  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
        {/* Orange reveal layer — sits behind everything */}
        <div className={styles.orangeLayer} aria-hidden="true" />

        {/* Live mesh gradient (hidden once the split has started, replaced by
            the two snapshot halves) */}
        <div className={`${styles.meshLayer} ${isSplitting ? styles.meshLayerHidden : ''}`}>
          <MeshGradient ref={meshRef} colors={MESH_COLORS} />
        </div>

        {/* Two halves of the mesh snapshot that slide apart */}
        {meshSnapshot && (
          <>
            <div
              className={`${styles.meshHalf} ${styles.meshTop} ${halvesOpen ? styles.splitOpen : ''}`}
              style={halvesStyle}
              aria-hidden="true"
            />
            <div
              className={`${styles.meshHalf} ${styles.meshBottom} ${halvesOpen ? styles.splitOpen : ''}`}
              style={halvesStyle}
              aria-hidden="true"
            />
          </>
        )}

        <div className={`${styles.content} ${textHidden ? styles.contentHidden : ''}`}>
          {/* Single headline slot: types "Hi, I'm Mrinal." → backspaces →
              types "I design with empathy for". Caret stays in place the
              whole time. */}
          <div className={styles.textBlock}>
            <p className={styles.heading}>
              {showDesign ? designTyped : hiTyped}
              {!designDone && <span className={styles.caret} aria-hidden="true" />}
            </p>
            <div className={styles.subtitleContainer}>
              {subtitleActive && (
                <p className={styles.subtitle}>
                  {subtitleTyped}
                  {(!subtitleCurrentDone || subtitleIsLast) && (
                    <span className={styles.caret} aria-hidden="true" />
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Scroll arrow */}
        <div className={`${styles.scrollArrow} ${textHidden ? styles.scrollArrowHidden : ''}`}>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 4v16M2 14l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Full-viewport orange cover that fades away, revealing the Statements
          section that we've already scrolled to. */}
      {showOverlay && <div className={styles.fadeOverlay} aria-hidden="true" />}
    </div>
  )
}
