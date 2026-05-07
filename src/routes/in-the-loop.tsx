import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { SectionLabel } from '~/components/SectionLabel'
import { CountUp } from '~/components/CountUp'
import { DraggableCardStack } from '~/components/case-study/DraggableCardStack'
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
  const problemRowRef = useRef<HTMLDivElement>(null)
  const matrixRef = useRef<HTMLDivElement>(null)
  const revealedCount = useRef(0)
  const lastRevealScroll = useRef(0)

  useEffect(() => {
    const row = problemRowRef.current
    if (!row) return
    const cards = row.querySelectorAll<HTMLElement>(`.${styles.problemCard}`)
    if (!cards.length) return

    const SCROLL_GAP = 150

    const onScroll = () => {
      if (revealedCount.current >= cards.length) return
      const rect = row.getBoundingClientRect()
      if (rect.top >= window.innerHeight * 0.8) return

      const scrollY = window.scrollY
      if (revealedCount.current === 0 || scrollY - lastRevealScroll.current >= SCROLL_GAP) {
        cards[revealedCount.current].classList.add(styles.problemCardVisible)
        lastRevealScroll.current = scrollY
        revealedCount.current++
      }
    }

    const matrixEl = matrixRef.current
    let matrixRevealed = false
    const onMatrixScroll = () => {
      if (matrixRevealed || !matrixEl) return
      const rect = matrixEl.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.7) {
        matrixEl.classList.add(styles.matrixRevealed)
        matrixRevealed = true
      }
    }

    const combinedScroll = () => {
      onScroll()
      onMatrixScroll()
    }

    window.addEventListener('scroll', combinedScroll, { passive: true })
    onScroll()
    onMatrixScroll()
    return () => window.removeEventListener('scroll', combinedScroll)
  }, [])

  return (
    <>
      <Navbar alwaysVisible />
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroHeader}>
            <div className={styles.heroTitle}>
              <h1>In the Loop</h1>
            </div>
            <div className={styles.heroDesc}>
              <p>Redefining professional mobility as a tool for community building and intentional growth.</p>
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
          <SectionLabel title="OVERVIEW" />
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
              <p className={styles.statNumber}><CountUp to={90000} duration={1800} /></p>
              <p className={styles.statUnit}>HOURS</p>
              <p className={styles.statBody}>at work over a lifetime — that's a full decade of your adulthood, gone.</p>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBlock}>
              <p className={styles.statNumber}><CountUp to={10} duration={1400} /></p>
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
            <SectionLabel title="SOLUTION" />
          </div>

          {/* Concluding quote sits above the carousel, left-aligned with the
              page padding like the rest of the content above. */}
          <div className={styles.concludingQuote}>
            <p>A digital platform intentionally designed for professionals seeking flexible accommodations and meaningful connections.</p>
          </div>

          <div className={styles.carousel}>
            <div className={styles.phoneBezels}>
              {/* Phone frame */}
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen} />
              </div>
            </div>
            <div className={styles.carouselTrack}>
              {/* Render the 5-screen sequence twice so the slide animation can
                  loop seamlessly (jumps back after one full set is scrolled). */}
              {[3, 5, 4, 1, 2, 3, 5, 4, 1, 2].map((n, i) => (
                <div key={`${n}-${i}`} className={styles.screenCard}>
                  <img
                    className={styles.screenImg}
                    src={`/images/screen ${String(n).padStart(2, '0')}.png`}
                    alt={`In the Loop screen ${n}`}
                  />
                </div>
              ))}
            </div>
            <div className={styles.carouselFade} />
          </div>
        </section>

        {/* What we heard — research findings */}
        <section className={styles.heardSection}>
          <div className={styles.heardLabelWrap}>
            <SectionLabel title="PROBLEM" />
          </div>

          <h2 className={styles.heardHeadline}>
            They aren&rsquo;t just dissatisfied with their work, but also with how and where they work from.
          </h2>

                    <DraggableCardStack
            cards={[
              { tone: 'yellow', text: '“Difficulty separating work and personal life, particularly as my desk is in my bedroom.”' },
              { tone: 'indigo', text: '“I enjoyed going into the office, the small social interactions in between your workday.”' },
              { tone: 'yellow', text: '“Dedicated time to connect with coworkers — shared lunchtimes without interruptions — so important!”' },
              { tone: 'indigo', text: '“Social interactions during my workday help me cope with my work stress.”' },
              { tone: 'indigo', text: '“Confused between the sentiments that come with WFH and working from office.”' },
              { tone: 'yellow', text: '“Coping with the stress of workload — walk, take some time away from my work desk, a short exercise, or changing my work environment.”' },
              { tone: 'yellow', text: '“Working by a beach is my dream scenario.”' },
            ]}
          />

          {/* Takeaways intro + problem cards + opportunity question */}
          <p className={styles.takeawayIntro}>These conversations helped shape our key takeaways.</p>

          <div className={styles.problemRow} ref={problemRowRef}>
            {[
              { number: '1', text: 'Remote work means freedom to go anywhere but finding places that actually fuel creativity, not just provide WiFi, is still a puzzle' },
              { number: '2', text: 'Monotonous routines drain energy and kill innovation. There is no variety, no unexpected experiences to break the loop' },
              { number: '3', text: 'Limited social interaction leaves people isolated, missing the mentors, collaborators, and community that make work meaningful' },
            ].map((item, i) => (
              <div
                key={i}
                className={styles.problemCard}
              >
                <span className={styles.problemNumber}>{item.number}.</span>
                <p className={styles.problemText}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Existing platforms */}
          <p className={styles.existingIntro}>Existing platforms treated these as separate problems:</p>

          <div className={styles.platformRow}>
            <div className={styles.platformCard}>
              <img src="https://cdn.worldvectorlogo.com/logos/airbnb-1.svg" alt="Airbnb" className={styles.platformLogo} />
              <p className={styles.platformText}>Solved <em>where</em> to stay</p>
            </div>
            <div className={styles.platformCard}>
              <img src="/images/luma_logo.webp" alt="Luma" className={styles.platformLogo} />
              <p className={styles.platformText}>Solved <em>what</em> to do</p>
            </div>
            <div className={styles.platformCard}>
              <img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-3.svg" alt="LinkedIn" className={styles.platformLogo} />
              <p className={styles.platformText}>Solved <em>who</em> to connect with</p>
            </div>
          </div>

          {/* Highlight callout */}
          <div className={styles.connectDotsBox}>
            <h3 className={styles.connectDotsHeading}>But nobody<br />connected the dots.</h3>
            <p className={styles.connectDotsBody}>Where you go, whom you meet, and where you&rsquo;re trying to grow remained siloed experiences. That&rsquo;s the gap In the Loop was designed to fill.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
