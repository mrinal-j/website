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
  const featuresSectionRef = useRef<HTMLElement>(null)
  const phoneScreenImgRef = useRef<HTMLImageElement>(null)
  const features2Ref = useRef<HTMLElement>(null)
  const phoneScreen2ImgRef = useRef<HTMLImageElement>(null)
  const features3Ref = useRef<HTMLDivElement>(null)
  const phoneScreen3aRef = useRef<HTMLImageElement>(null)
  const phoneScreen3bRef = useRef<HTMLImageElement>(null)
  const screen3Swapped = useRef(false)

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

    const onPhoneScroll = () => {
      const wrap = featuresSectionRef.current
      const img = phoneScreenImgRef.current
      if (!wrap || !img) return
      const rect = wrap.getBoundingClientRect()
      const viewH = window.innerHeight
      // progress 0→1 based on how far through the tall wrapper we've scrolled
      // starts when wrapper top hits viewport top, ends when wrapper bottom leaves
      const scrollable = rect.height - viewH
      if (scrollable <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      // translate the screen image up by progress * 45%
      img.style.transform = `translateY(${-progress * 45}%)`
    }

    const onPhoneScroll2 = () => {
      const wrap = features2Ref.current
      const img = phoneScreen2ImgRef.current
      if (!wrap || !img) return
      const rect = wrap.getBoundingClientRect()
      const viewH = window.innerHeight
      const scrollable = rect.height - viewH
      if (scrollable <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      img.style.transform = `translateY(${-progress * 45}%)`
    }

    const onPhoneSwap3 = () => {
      const wrap = features3Ref.current
      const imgA = phoneScreen3aRef.current
      const imgB = phoneScreen3bRef.current
      if (!wrap || !imgA || !imgB) return
      const rect = wrap.getBoundingClientRect()
      const viewH = window.innerHeight
      const scrollable = rect.height - viewH
      if (scrollable <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))

      if (progress > 0.35 && !screen3Swapped.current) {
        screen3Swapped.current = true
        imgA.classList.add(styles.phoneScreenHidden)
        imgB.classList.remove(styles.phoneScreenHidden)
      } else if (progress <= 0.2 && screen3Swapped.current) {
        screen3Swapped.current = false
        imgB.classList.add(styles.phoneScreenHidden)
        imgA.classList.remove(styles.phoneScreenHidden)
      }
    }

    const combinedScroll = () => {
      onScroll()
      onMatrixScroll()
      onPhoneScroll()
      onPhoneScroll2()
      onPhoneSwap3()
    }

    window.addEventListener('scroll', combinedScroll, { passive: true })
    onScroll()
    onMatrixScroll()
    onPhoneScroll()
    onPhoneScroll2()
    onPhoneSwap3()
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
            <SectionLabel title="WHAT WE BUILT" />
          </div>

          {/* Concluding quote sits above the carousel, left-aligned with the
              page padding like the rest of the content above. */}
          <div className={styles.concludingQuote}>
            <p>A digital platform intentionally designed for professionals seeking flexible accommodations and meaningful connections.</p>
          </div>

          <div className={styles.carousel}>
            <div className={styles.phoneBezels}>
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
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"/></svg>
              16 User interviews
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M232,56H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40V56H24A8,8,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A8,8,0,0,0,232,56ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8V56H96ZM224,192H32V72H224Z"/></svg>
              3 Industry experts
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM72,64H184V192H72Zm8-32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8V208H184v16A8,8,0,0,1,176,224Z"/></svg>
              App usability testing
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM40,80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40v96a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40Zm148-8a12,12,0,1,1-12-12A12,12,0,0,1,188,72Zm-28,56a32,32,0,1,1-32-32A32,32,0,0,1,160,128Zm16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128Z"/></svg>
              Instagram engagement
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168h52a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"/></svg>
              Website engagement
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
                <li>Users arrived with needs that a home-swapping model could not account for</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Pivot */}
        <section className={styles.pivotSection}>
          <div className={styles.pivotBox}>
            <div className={styles.pivotLeft}>
              <span className={styles.pivotLabel}>THE PIVOT</span>
              <h2 className={styles.pivotHeading}>From home swapping<br />to intentionally<br />hosted stays.</h2>
            </div>
            <p className={styles.pivotBody}>
              Testing showed users wanted flexibility beyond just direct swaps where scheduling was rigid and use cases were broader. We evolved from a swap model to a <strong>trusted hosted-stay network</strong>, preserving the core values of affordability, community, and professional alignment.
            </p>
          </div>
        </section>

        {/* Prototype Testing */}
        <section className={styles.protoSection}>
          <div className={styles.protoLabelWrap}>
            <SectionLabel title="PROTOTYPE TESTING" />
          </div>

          <h3 className={styles.protoSubheading}>How we tested</h3>

          <div className={styles.testedMethods}>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><polyline points="4 7 12 3 20 7"/><path d="M4 7l-2 8a5 5 0 0 0 8 0L8 7"/><path d="M16 7l-2 8a5 5 0 0 0 8 0l-2-8"/><line x1="2" y1="21" x2="22" y2="21"/></svg>
              A/B testing
            </div>
            <div className={styles.methodPill}>
              <svg className={styles.methodIcon} viewBox="0 0 256 256" fill="currentColor"><path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm0,192H56V40H200ZM76,80A12,12,0,1,1,88,92,12,12,0,0,1,76,80Zm0,48a12,12,0,1,1,12,12A12,12,0,0,1,76,128Zm0,48a12,12,0,1,1,12,12A12,12,0,0,1,76,176Zm36-96h72a8,8,0,0,0,0-16H112a8,8,0,0,0,0,16Zm72,32H112a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm0,48H112a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Z"/></svg>
              End-to-end usability testing
            </div>
          </div>

          <h3 className={styles.protoSubheading}>What we fixed</h3>

          <div className={styles.fixRow}>
            <div className={styles.fixCard}>
              <span className={styles.fixNumber}>01</span>
              <p className={styles.fixProblem}>Users didn't know what the platform offered before being asked to complete onboarding.</p>
              <p className={styles.fixAction}><span className={styles.fixActionTag}>Action</span> Frontload the value proposition before any sign-up questions.</p>
            </div>
            <div className={styles.fixCard}>
              <span className={styles.fixNumber}>02</span>
              <p className={styles.fixProblem}>Users expected to reach a host's full profile directly from the listing, and not a toggle.</p>
              <p className={styles.fixAction}><span className={styles.fixActionTag}>Action</span> Direct link from listing card to full host profile.</p>
            </div>
            <div className={styles.fixCard}>
              <span className={styles.fixNumber}>03</span>
              <p className={styles.fixProblem}>Local recommendations were invisible when buried inside the host profile.</p>
              <p className={styles.fixAction}><span className={styles.fixActionTag}>Action</span> Surfaced as a persistent card earlier in the flow.</p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className={styles.solSection}>
          <div className={styles.solLabelWrap}>
            <SectionLabel title="SOLUTION" dark />
          </div>

          <div className={styles.solHeader}>
            <div className={styles.solLogoWrap}>
              <img src="/images/itl_logo_white.png" alt="In the Loop" className={styles.solLogo} />
            </div>
            <div className={styles.solTagline}>
              <h2 className={styles.solTaglineText}>A platform connecting professionals through<br />intentional, hosted stays — built on trust,<br />shared values, and community.</h2>
            </div>
          </div>

          <div className={styles.solCards}>
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className={styles.solCard}>
                <img
                  src={`/images/solution_${n}.png`}
                  alt={`Solution value ${n}`}
                  className={styles.solCardImg}
                />
              </div>
            ))}
          </div>

          <p className={styles.stayIntro}>Beyond rigid booking models, In the Loop offers stay types that match<br />how professionals actually move.</p>

          <div className={styles.stayRow}>
            <div className={styles.stayCard}>
              <div className={styles.stayIconWrap}>
                <img src="/images/Synchronized.png" alt="Synchronized" className={styles.stayIcon} />
              </div>
              <h4 className={styles.stayTitle}>Synchronized</h4>
              <p className={styles.stayDesc}>A synchronized stay is between two members traveling to each others home at the same time</p>
            </div>
            <div className={styles.stayCard}>
              <div className={styles.stayIconWrap}>
                <img src="/images/Flexible.png" alt="Flexible" className={styles.stayIcon} />
              </div>
              <h4 className={styles.stayTitle}>Flexible</h4>
              <p className={styles.stayDesc}>A flexible stay is between two members traveling to each other's home at different times</p>
            </div>
            <div className={styles.stayCard}>
              <div className={styles.stayIconWrap}>
                <img src="/images/One-Way.png" alt="One-Way" className={styles.stayIcon} />
              </div>
              <h4 className={styles.stayTitle}>One-Way</h4>
              <p className={styles.stayDesc}>A one-way stay is where only one member travels to another's home and has a full house to use</p>
            </div>
            <div className={styles.stayCard}>
              <div className={styles.stayIconWrap}>
                <img src="/images/Shared.png" alt="Shared" className={styles.stayIcon} />
              </div>
              <h4 className={styles.stayTitle}>Shared</h4>
              <p className={styles.stayDesc}>A shared stay is where a member travels to another's home while that member is still there</p>
            </div>
          </div>
        </section>

        {/* Key Features — intro text scrolls normally */}
        <div className={styles.featuresIntroBg}>
          <p className={styles.featuresIntro}>Core features designed to help you discover your perfect work-and-travel experience.</p>
        </div>
        {/* Tall scroll wrapper — sticky section starts here */}
        <div className={styles.featuresScrollWrap} ref={featuresSectionRef}>
          <section className={styles.featuresSection}>
            <div className={styles.featureBlock}>
              <div className={styles.featureText}>
                <img src="/images/curated picks_icon.png" alt="" className={styles.featureIconImg} />
                <h2 className={styles.featureHeading}>
                  <span className={styles.featureHighlight}>Curated stays</span> and people matched to your professional background, goals, and industry. As your career shifts, so do your picks.
                </h2>
              </div>
              <div className={styles.phoneContainer}>
                <div className={styles.phoneMockup}>
                  {/* Screen content (behind the frame) */}
                  <div className={styles.featPhoneScreen}>
                    <img
                      ref={phoneScreenImgRef}
                      src="/images/curated picks_1_screen.png"
                      alt="Discover screen"
                      className={`${styles.phoneScreenImg} ${styles.phoneScreen1}`}
                    />
                  </div>
                  {/* Bottom nav bar — sits between screen and frame */}
                  <div className={styles.phoneNavBar}>
                    <img
                      src="/images/curated picks_bottom nav bar_screen.png"
                      alt="Navigation"
                      className={styles.phoneNavBarImg}
                    />
                  </div>
                  {/* Phone frame overlay */}
                  <img
                    src="/images/iPhone 16 pro.png"
                    alt=""
                    className={styles.phoneFrameImg}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Feature 2 — Engage with Host */}
        <div className={styles.featuresScrollWrap} ref={features2Ref}>
          <section className={styles.featuresSection}>
            <div className={styles.featureBlock}>
              <div className={styles.featureText}>
                <img src="/images/engage w: host_icon.png" alt="" className={styles.featureIconImg} />
                <h2 className={styles.featureHeading}>
                  Go beyond just booking a stay and <span className={styles.featureHighlight}>engage with the working professionals who host you.</span>
                </h2>
              </div>
              <div className={styles.phoneContainer}>
                <div className={styles.phoneMockup}>
                  {/* Screen content (behind the frame) */}
                  <div className={styles.featPhoneScreen}>
                    <img
                      ref={phoneScreen2ImgRef}
                      src="/images/engaged_new_screen.png"
                      alt="Engage screen"
                      className={`${styles.phoneScreenImg} ${styles.phoneScreen1}`}
                    />
                  </div>
                  {/* Bottom nav bar — sits between screen and frame */}
                  <div className={styles.phoneNavBar}>
                    <img
                      src="/images/curated picks_bottom nav bar_screen.png"
                      alt="Navigation"
                      className={styles.phoneNavBarImg}
                    />
                  </div>
                  {/* Phone frame overlay */}
                  <img
                    src="/images/iPhone 16 pro.png"
                    alt=""
                    className={styles.phoneFrameImg}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Feature 3 — Looped In */}
        <div className={styles.featuresScrollWrap} ref={features3Ref}>
          <section className={styles.featuresSection}>
            <div className={styles.featureBlock}>
              <div className={styles.featureText}>
                <img src="/images/looped in_icon.png" alt="" className={styles.featureIconImg} />
                <h2 className={styles.featureHeading}>
                  The journey doesn&rsquo;t end when your stay does. <span className={styles.featureHighlight}>Stay connected with your hosts and fellow professionals.</span>
                </h2>
              </div>
              <div className={styles.phoneContainer}>
                <div className={styles.phoneMockup}>
                  <div className={styles.featPhoneScreen}>
                    <img
                      ref={phoneScreen3aRef}
                      src="/images/looped_1_screen.png"
                      alt="Looped in screen 1"
                      className={`${styles.phoneScreenImg} ${styles.phoneScreenSwap}`}
                    />
                    <img
                      ref={phoneScreen3bRef}
                      src="/images/looped_2_screen.png"
                      alt="Looped in screen 2"
                      className={`${styles.phoneScreenImg} ${styles.phoneScreenSwap} ${styles.phoneScreenHidden}`}
                    />
                  </div>
                  <div className={styles.phoneNavBar}>
                    <img
                      src="/images/curated picks_bottom nav bar_screen.png"
                      alt="Navigation"
                      className={styles.phoneNavBarImg}
                    />
                  </div>
                  <img
                    src="/images/iPhone 16 pro.png"
                    alt=""
                    className={styles.phoneFrameImg}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
