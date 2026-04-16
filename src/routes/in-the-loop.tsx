import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { SectionLabel } from '~/components/SectionLabel'
import styles from '~/components/case-study/InTheLoop.module.css'

export const Route = createFileRoute('/in-the-loop')({
  head: () => ({
    meta: [
      { title: 'In the Loop — Mrinal Jadhav' },
      { name: 'description', content: 'A social impact design project exploring how professionals find meaningful places and connections.' },
    ],
  }),
  component: InTheLoopPage,
})

function InTheLoopPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroHeader}>
            <div className={styles.heroTitle}>
              <h1>In the Loop</h1>
            </div>
            <div className={styles.heroDesc}>
              <p>A social impact design project exploring how </p>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="/images/iHkx9gYek2TcjPXt4cRuVfh1s.png"
              alt="In the Loop"
            />
          </div>
        </section>

        {/* Metadata Grid */}
        <section className={styles.metaGrid}>
          <div className={styles.metaCell}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>Research, Strategy,{'\n'}Brand Design, UX/UI Design</span>
          </div>
          <div className={styles.metaCell}>
            <span className={styles.metaLabel}>Skills / Tools</span>
            <span className={styles.metaValue}>Human-Centered Design, Product Design, Visual Design, Adobe Illustrator, Figma, FigJam</span>
          </div>
          <div className={styles.metaCell}>
            <span className={styles.metaLabel}>Timeline</span>
            <span className={styles.metaValue}>12 months</span>
          </div>
          <div className={`${styles.metaCell} ${styles.metaCellLast}`}>
            <span className={styles.metaLabel}>Team</span>
            <span className={styles.metaValue}>3 member group</span>
          </div>
        </section>

        {/* Overview */}
        <section className={styles.overview}>
          <SectionLabel number="01" title="OVERVIEW" />
          <div className={styles.overviewGrid}>
            <h2 className={styles.overviewHeading}>
              In the Loop is a digital platform that reimagines mobility as a tool for growth.
            </h2>
            <p className={styles.overviewBody}>
              It matches professionals with curated stays and communities based on their background, goals, and industry, helping you find stays and connections that inspire, not just accommodate.
            </p>
          </div>
        </section>

        {/* Highlight Banner */}
        <section className={styles.highlight}>
          <div className={styles.highlightBg} />
          <div className={styles.highlightContent}>
            <h2 className={styles.highlightText}>
              Empowering professionals to <em>move</em> intentionally, <em>work</em> seamlessly, and <em>live</em> beyond the routine.
            </h2>
          </div>
          <div className={styles.highlightPhone}>
            <img
              src="/images/Y59EHpZcLy1JTfVrOPKD2YbnoE.png"
              alt="In the Loop app mockup"
            />
          </div>
        </section>

        {/* Problem / Data */}
        <section className={styles.dataSection}>
          <div className={styles.dataLeft}>
            <div className={styles.statBlock}>
              <p className={styles.statLabel}>THE AVERAGE EMPLOYEE SPENDS</p>
              <p className={styles.statNumber}>90,000</p>
              <p className={styles.statUnit}>HOURS</p>
              <p className={styles.statBody}>at work over a lifetime — that's a full decade of your adulthood, gone.</p>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBlock}>
              <p className={styles.statNumber}>10</p>
              <p className={styles.statUnit}>YEARS OF YOUR ADULTHOOD</p>
            </div>
          </div>
          <div className={styles.dataRight}>
            <div className={styles.bubbleChart}>
              <div className={styles.bubbleLegend}>
                <span className={styles.legendWork}>WORK LIFE</span>
                <span className={styles.legendAdult}>ADULTHOOD</span>
              </div>
              <div className={styles.bubbleGrid}>
                <div className={`${styles.bubble} ${styles.bubbleYellow}`} />
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`${styles.bubble} ${styles.bubbleBlue}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HMW Question */}
        <section className={styles.hmwSection}>
          <div className={styles.hmwCard}>
            <svg className={styles.hmwIcon} width="32" height="32" viewBox="0 0 256 256" fill="var(--color-indigo)">
              <path d="M229.66,218.34l-50.07-50.07a88.11,88.11,0,1,0-11.31,11.31l50.07,50.07a8,8,0,0,0,11.31-11.31ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
            </svg>
            <p className={styles.hmwText}>
              How might we help professionals find meaningful places and people that support their growth, connection, and lifestyle?
            </p>
          </div>
        </section>

        {/* Solution - Phone Carousel */}
        <section className={styles.solutionSection}>
          <div className={styles.solutionLabelWrap}>
            <SectionLabel number="04" title="SOLUTION" dark />
          </div>
          <div className={styles.carousel}>
            <div className={styles.phoneBezels}>
              {/* Phone frame */}
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen} />
              </div>
            </div>
            <div className={styles.carouselTrack}>
              {['Screen 01', 'Screen 02', 'Screen 03', 'Screen 04', 'Screen 01', 'Screen 02', 'Screen 03', 'Screen 04'].map((label, i) => {
                const gradients = [
                  'linear-gradient(160deg, #1a1a3e, #0f3460)',
                  'linear-gradient(160deg, #1e3a2f, #0d2b40)',
                  'linear-gradient(160deg, #3a1a2e, #1a0d30)',
                  'linear-gradient(160deg, #1a2e3a, #0d1f2b)',
                ]
                return (
                  <div
                    key={`${label}-${i}`}
                    className={styles.screenCard}
                    style={{ background: gradients[i % 4] }}
                  >
                    <span className={styles.screenLabel}>{label}</span>
                  </div>
                )
              })}
            </div>
            <div className={styles.carouselFade} />
          </div>

          {/* Concluding quote */}
          <div className={styles.concludingQuote}>
            <p>A digital platform intentionally designed for professionals seeking flexible accommodations and meaningful connections.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
