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
              <span className={styles.platformName}>Airbnb</span>
              <p className={styles.platformText}>Solved <em>where</em> to stay</p>
            </div>
            <div className={styles.platformCard}>
              <img src="/images/luma_logo.webp" alt="Luma" className={styles.platformLogo} />
              <span className={styles.platformName}>Luma</span>
              <p className={styles.platformText}>Solved <em>what</em> to do</p>
            </div>
            <div className={styles.platformCard}>
              <img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-3.svg" alt="LinkedIn" className={styles.platformLogo} />
              <span className={styles.platformName}>LinkedIn</span>
              <p className={styles.platformText}>Solved <em>who</em> to connect with</p>
            </div>
          </div>

          {/* Highlight callout */}
          <div className={styles.connectDotsBox}>
            <h3 className={styles.connectDotsHeading}>But nobody<br />connected the dots.</h3>
            <p className={styles.connectDotsBody}>Where you go, whom you meet, and where you&rsquo;re trying to grow remained siloed experiences. That&rsquo;s the gap In the Loop was designed to fill.</p>
          </div>
        </section>

        {/* Exploration */}
        <section className={styles.explorationSection}>
          <div className={styles.explorationLabelWrap}>
            <SectionLabel title="EXPLORATION" />
          </div>

          <div className={styles.iterationTag}>Iteration 1</div>

          <div className={styles.oooContent}>
            <div className={styles.oooLogo}>
              <img src="/images/ooo_logo.png" alt="Out of Office logo" />
            </div>
            <div className={styles.oooDetails}>
              <p className={styles.oooHeadline}>
                Out of Office aims at providing affordable<br /><em>home swaps for working professionals</em>
              </p>
              <ul className={styles.oooFeatures}>
                <li>
                  <svg className={styles.featureIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M224,115.55V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V160H112v48a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l.11-.11,80-75.48a16,16,0,0,1,21.53,0l.11.11,80,75.48A16,16,0,0,1,224,115.55Z"/></svg>
                  Seamless home-swapping
                </li>
                <li>
                  <svg className={styles.featureIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M240,64V192a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V64A8,8,0,0,1,24,56H80V40a24,24,0,0,1,24-24h48a24,24,0,0,1,24,24V56h56A8,8,0,0,1,240,64ZM96,56h64V40a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8Z"/></svg>
                  Work-friendly spaces
                </li>
                <li>
                  <svg className={styles.featureIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm12,152h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24a28,28,0,0,1,0,56Z"/></svg>
                  Stay for a fraction of the cost
                </li>
              </ul>
            </div>
          </div>

          {/* How we tested it */}
          <h3 className={styles.testedHeading}>How we tested it</h3>

          <div className={styles.testedMethods}>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,49.53,98.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/></svg>
              16 User interviews
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M248,160a8,8,0,0,1-8,8H192v24a8,8,0,0,1-16,0V168H16a8,8,0,0,1,0-16H56V72H24a8,8,0,0,1,0-16H232a8,8,0,0,1,0,16H200v80h40A8,8,0,0,1,248,160ZM72,152h48V72H72Zm64,0h48V72H136Z"/></svg>
              2 Industry experts
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/></svg>
              1 Business mentor
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM72,64H184V192H72Zm8-32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8V208H184v16A8,8,0,0,1,176,224Z"/></svg>
              App usability testing
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.16,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.16-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,74,34.5a8,8,0,0,0-3.93,6L67.43,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.16,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.16,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.16,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.16-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.16,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"/></svg>
              Instagram engagement
            </div>
          </div>

          {/* What worked / What didn't */}
          <div className={styles.outcomeRow}>
            <div className={`${styles.outcomeCard} ${styles.outcomeWorked}`}>
              <div className={styles.outcomeHeader}>
                <svg className={styles.outcomeIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21.12l12-96A24,24,0,0,0,234,80.12Z"/></svg>
                <span>What worked</span>
              </div>
              <ul className={styles.outcomeList}>
                <li>Strong desire for affordable, flexible accommodations</li>
                <li>Users valued building trust within a professional network</li>
                <li>Curation toward employee needs resonated strongly</li>
              </ul>
            </div>
            <div className={`${styles.outcomeCard} ${styles.outcomeFailed}`}>
              <div className={styles.outcomeHeader}>
                <svg className={styles.outcomeIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M239.82,157.12l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-26.88Z"/></svg>
                <span>What didn't work</span>
              </div>
              <ul className={styles.outcomeList}>
                <li>Direct swaps created logistical friction users didn't want</li>
                <li>Narrow audience limited growth potential</li>
                <li>Swap-only model restricted community building</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
