import { NowPlaying } from './NowPlaying'
import styles from './AboutHero.module.css'

export function AboutHero() {
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Hi, I&rsquo;m Mrinal!</h1>

      <div className={styles.grid}>
        <img
          src="/images/about-hero.webp"
          alt="Mrinal smiling on the Brooklyn Bridge at night, with the lit-up Manhattan skyline behind her"
          className={styles.photo}
          width="1200"
          height="1407"
        />

        <div className={styles.intro}>
          <p className={styles.lead}>
            I craft inclusive, accessible, and impactful experiences,
            specialising in brand strategy and visual design.
          </p>
          <p className={styles.sub}>
            Based in New York, currently with the Executive Office of the
            Secretary-General at the United Nations. Before that, Parsons
            School of Design.
          </p>

          <div className={styles.playerWrap}>
            <NowPlaying />
          </div>

          <p className={styles.note}>
            Here&rsquo;s a song by a band I adore, perfect to play while you
            get to know me better :)
          </p>
        </div>
      </div>
    </section>
  )
}
