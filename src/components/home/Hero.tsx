import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

// ─────────────────────────────────────────────────────────────
// TIMING CONTROLS (all values in milliseconds)
// Adjust these numbers to speed up or slow down the animation.
// ─────────────────────────────────────────────────────────────
const TYPING_SPEED = 60          // delay between each character as it types
const BACKSPACE_SPEED = 70       // delay between each character as a subtitle erases
const PAUSE_AFTER_HI = 900       // how long "Hi, I'm Mrinal." stays before fading out
const PHASE_FADE = 400           // fade time between the "Hi" line and the "I design with empathy" block
const PAUSE_BEFORE_SUBTITLES = 250 // pause after "I design with empathy for" finishes typing
const SUBTITLE_HOLD = 1400       // how long each subtitle stays fully visible before it backspaces
// ─────────────────────────────────────────────────────────────

const HI_TEXT = "Hi, I'm Mrinal."
const DESIGN_TEXT = 'I design with empathy for'
const subtitles = [
  'solutions that scale impact.',
  'communities.',
  'interventions that matter.',
]

export function Hero() {
  const [hiTyped, setHiTyped] = useState('')
  const [showDesign, setShowDesign] = useState(false)
  const [designTyped, setDesignTyped] = useState('')
  const [designDone, setDesignDone] = useState(false)
  const [subtitleIndex, setSubtitleIndex] = useState(-1)
  const [subtitleTyped, setSubtitleTyped] = useState('')
  const [isErasing, setIsErasing] = useState(false)

  const hiDone = hiTyped.length === HI_TEXT.length

  // Type "Hi, I'm Mrinal." then pause
  useEffect(() => {
    if (hiTyped.length < HI_TEXT.length) {
      const t = setTimeout(
        () => setHiTyped(HI_TEXT.slice(0, hiTyped.length + 1)),
        TYPING_SPEED,
      )
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShowDesign(true), PAUSE_AFTER_HI)
    return () => clearTimeout(t)
  }, [hiTyped])

  // Type the "I design with empathy for" line
  useEffect(() => {
    if (!showDesign) return
    if (designTyped.length < DESIGN_TEXT.length) {
      const t = setTimeout(
        () => setDesignTyped(DESIGN_TEXT.slice(0, designTyped.length + 1)),
        TYPING_SPEED,
      )
      return () => clearTimeout(t)
    }
    if (!designDone) {
      const t = setTimeout(() => setDesignDone(true), PAUSE_BEFORE_SUBTITLES)
      return () => clearTimeout(t)
    }
  }, [showDesign, designTyped, designDone])

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

  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
        <div className={styles.content}>
          {/* "Hi, I'm Mrinal." */}
          <div
            className={`${styles.textBlock} ${showDesign ? styles.fadeOut : styles.fadeIn}`}
          >
            <p className={styles.heading}>
              {hiTyped}
              {!showDesign && <span className={styles.caret} aria-hidden="true" />}
            </p>
          </div>

          {/* "I design with empathy for …" */}
          <div
            className={`${styles.textBlock} ${showDesign ? styles.fadeIn : styles.fadeOut}`}
          >
            <p className={styles.heading}>
              {designTyped}
              {showDesign && !designDone && (
                <span className={styles.caret} aria-hidden="true" />
              )}
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
        <div className={styles.scrollArrow}>
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
    </div>
  )
}
