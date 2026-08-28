import styles from './NowPlaying.module.css'

/**
 * Spotify's official embedded player for the track.
 *
 * This is the licensed way to play the real song on the page: it brings the
 * official cover art, plays the full track for anyone signed in to Spotify,
 * and a 30 second preview for everyone else. Spotify controls the look
 * inside the frame; theme=0 is its darker treatment.
 *
 * Track id confirmed via Spotify's oEmbed API.
 */
const TRACK_ID = '6f49kbOuQSOsStBpyGvQfA'

/** 80 is Spotify's slim bar; 352 is its square-ish card. */
export function NowPlaying({ height = 80 }: { height?: number }) {
  return (
    <iframe
      className={styles.player}
      style={{ height }}
      src={`https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&theme=0`}
      title="Spotify player: A Head Full of Dreams by Coldplay"
      width="100%"
      frameBorder="0"
      loading="lazy"
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  )
}
