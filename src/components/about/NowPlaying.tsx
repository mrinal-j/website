import styles from './NowPlaying.module.css'

/**
 * Hand-drawn "now playing" music player sketch.
 * Purely decorative for now: the play button is part of the drawing
 * and does nothing yet. Sound can be wired up later.
 */
export function NowPlaying() {
  return (
    <div
      className={styles.player}
      role="img"
      aria-label="Sketch of a music player showing A Head Full Of Dreams by Coldplay"
    >
      <span className={styles.label} aria-hidden="true">
        now playing
      </span>

      <div className={styles.row} aria-hidden="true">
        <span className={styles.playBtn}>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path
              d="M2.5 2.2c0-1 1.1-1.6 2-1.1l10 5.9c.9.5.9 1.9 0 2.4l-10 5.9c-.9.5-2-.1-2-1.1V2.2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>

        <span className={styles.track}>
          <span className={styles.title}>A Head Full Of Dreams</span>
          <span className={styles.artist}>Coldplay</span>
        </span>

        <span className={styles.reels}>
          <span className={styles.reel} />
          <span className={styles.reelSmall} />
        </span>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span className={styles.dashes} />
        <span className={styles.time}>4:43</span>
      </div>
    </div>
  )
}
