import styles from './AboutHero.module.css'

export function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <img
          src="/images/about-hero-01.webp"
          alt="Mrinal in cap and gown at her Parsons School of Design graduation"
          className={styles.photo}
          width="1200"
          height="1600"
        />

        <div className={styles.intro}>
          <h1 className={styles.heading}>Hi, I&rsquo;m Mrinal!</h1>

          <p className={styles.body}>
            I am a visual designer and strategist based in New York City.
          </p>
          <p className={styles.body}>
            I build brand strategies, identities, campaigns, and the print and
            digital work that carries them.
          </p>
          <p className={styles.body}>
            I am drawn towards design that genuinely changes how people think,
            act and experience the world around them. Most recently, I have
            been leading brand and visual design for a system-wide reform
            effort at the United Nations Executive Office of the
            Secretary-General, making complex institutional work feel clearer.
          </p>
          <p className={styles.body}>
            I believe design builds trust in work that matters.
          </p>
        </div>
      </div>
    </section>
  )
}
