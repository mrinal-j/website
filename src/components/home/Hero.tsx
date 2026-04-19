import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

// ─────────────────────────────────────────────────────────────
// TIMING CONTROLS (all values in milliseconds)
// Adjust these numbers to speed up or slow down the animation.
// ─────────────────────────────────────────────────────────────
const TYPING_SPEED = 60          // delay between each character as it types
const BACKSPACE_SPEED = 70       // delay between each character as it erases (both the "Hi" line and subtitles)
const PAUSE_AFTER_HI = 900       // how long "Hi, I'm Mrinal." stays fully typed before it starts backspacing
const PAUSE_AFTER_ERASE = 500    // breath after the "Hi" line is fully erased, before "I design…" starts typing
const PAUSE_BEFORE_SUBTITLES = 250 // pause after "I design with empathy for" finishes typing
const SUBTITLE_HOLD = 1400       // how long each subtitle stays fully visible before it backspaces

// ── Split + fade transition to Statements ─────────────────────
const PAUSE_BEFORE_SPLIT = 1200  // how long the final subtitle sits before the black screen starts splitting
const TEXT_FADE_DURATION = 350   // how quickly the text fades out just before the split begins
const SPLIT_DURATION = 1100      // how long the two halves take to slide apart
const ORANGE_HOLD = 400          // how long the full orange screen lingers before we cross-fade to Statements
const FADE_DURATION = 700        // how long the orange takes to fade out revealing the Statements section
// ─────────────────────────────────────────────────────────────

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
      // Fully erased — take a short breath before typing the next line.
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

  // Kick off subtitles once the design line finishes typing
  useEffect(() => {
    if (designDone && subtitleIndex === -1) setSubtitleIndex(0)
  }, [designDone, subtitleIndex])

  // Type each subtitle, hold, backspace it, then advance to the next
  useEffect(() => {
    if (subtitleIndex < 0 || subtitleIndex >= subtitles.length) return
    const current = subtitles[subtitleIndex]

    // Typing forward
    if (!isErasing) {
      if (subtitleTyped.length < current.length) {
        const t = setTimeout(
          () => setSubtitleTyped(current.slice(0, subtitleTyped.length + 1)),
          TYPING_SPEED,
        )
        return () => clearTimeout(t)
      }
      // Finished typing. If this is the last subtitle, stop here.
      if (subtitleIndex === subtitles.length - 1) return
      // Otherwise hold, then start erasing.
      const t = setTimeout(() => setIsErasing(true), SUBTITLE_HOLD)
      return () => clearTimeout(t)
    }

    // Erasing (backspace)
    if (subtitleTyped.length > 0) {
      const t = setTimeout(
        () => setSubtitleTyped(subtitleTyped.slice(0, -1)),
        BACKSPACE_SPEED,
      )
      return () => clearTimeout(t)
    }
    // Fully erased — move to next subtitle.
    setIsErasing(false)
    setSubtitleIndex(subtitleIndex + 1)
  }, [subtitleIndex, subtitleTyped, isErasing])

  const subtitleActive =
    subtitleIndex >= 0 && subtitleIndex < subtitles.length
  const subtitleCurrentDone =
    subtitleActive && subtitleTyped.length === subtitles[subtitleIndex].length
  const subtitleIsLast =
    subtitleActive && subtitleIndex === subtitles.length - 1

  // Once the last subtitle finishes typing, run the split → orange → fade sequence
  useEffect(() => {
    if (transition !== 'idle') return
    if (!(subtitleIsLast && subtitleCurrentDone)) return

    // 1) hold on the final subtitle
    const t1 = setTimeout(() => setTransition('textFade'), PAUSE_BEFORE_SPLIT)
    return () => clearTimeout(t1)
  }, [transition, subtitleIsLast, subtitleCurrentDone])

  useEffect(() => {
    if (transition === 'textFade') {
      // 2) fade text, then split
      const t = setTimeout(() => setTransition('splitting'), TEXT_FADE_DURATION)
      return () => clearTimeout(t)
    }
    if (transition === 'splitting') {
      // 3) once halves are apart, jump the page down and cross-fade into Statements
      const t = setTimeout(() => {
        document.getElementById('statements')?.scrollIntoView({ behavior: 'auto', block: 'start' })
        setTransition('fading')
      }, SPLIT_DURATION + ORANGE_HOLD)
      return () => clearTimeout(t)
    }
    if (transition === 'fading') {
      const t = setTimeout(() => setTransition('done'), FADE_DURATION)
      return () => clearTimeout(t)
    }
  }, [transition])

  const isSplitting = transition === 'splitting' || transition === 'fading' || transition === 'done'
  const textHidden = transition !== 'idle'
  const showOverlay = transition === 'fading' // full-screen overlay that fades out revealing Statements

  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
        {/* Orange reveal layer — sits behind the black panels */}
        <div className={styles.orangeLayer} aria-hidden="true" />

        {/* Two black panels that cover the orange — when the sequence starts,
            they slide apart (top up, bottom down), revealing the orange. */}
        <div
          className={`${styles.splitPanel} ${styles.splitTop} ${isSplitting ? styles.splitOpen : ''}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.splitPanel} ${styles.splitBottom} ${isSplitting ? styles.splitOpen : ''}`}
          aria-hidden="true"
        />

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
          section that we've already scrolled to. Covers the seam between the
          split animation ending and the next section appearing. */}
      {showOverlay && <div className={styles.fadeOverlay} aria-hidden="true" />}
    </div>
  )
}
