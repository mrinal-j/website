import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import styles from './FeaturedWorks.module.css'

const CARD_GAP = 20

// ── Arrow sizing ──────────────────────────────────────────────
// Change ARROW_SIZE to make both scroll arrows bigger or smaller.
const ARROW_SIZE = 48   // circle diameter in px
const ARROW_ICON = 18   // icon stroke size in px

const projects = [
  {
    slug: '/in-the-loop',
    title: 'In the Loop',
    description: 'Short description of what problem it solved.',
    tags: ['UX Design', 'Research'],
    image: '/images/iHkx9gYek2TcjPXt4cRuVfh1s.png',
  },
  {
    slug: '#',
    title: 'Know your Vote',
    description: 'A design intervention that transforms how voters access, understand, and engage with electoral information.',
    tags: ['Service design', 'Design for civic impact'],
    image: '/images/PN2PjVKa1k8qTqovQptaN279mD4.png',
  },
  {
    slug: '#',
    title: 'Reimaging Housing Works, New York',
    description: 'Transforming their thrift shop into a global retail destination that fuels its mission of community empowerment.',
    tags: ['Brand Strategy', 'Retail Experience Design'],
    image: '/images/DIQbZGpjnsJJT6IXdEaM4e7u1mw.jpg',
  },
]

export function FeaturedWorks() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = viewport
      setCanScrollLeft(scrollLeft > 8)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8)
    }

    checkScroll()
    viewport.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      viewport.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scrollCards = (dir: 'left' | 'right') => {
    const viewport = viewportRef.current
    const firstCard = trackRef.current?.children[0] as HTMLElement | undefined
    if (!viewport || !firstCard) return
    const amount = firstCard.offsetWidth + CARD_GAP
    viewport.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section id="featured-works" className={styles.section}>
      <div className={styles.header}>
        <h2 id="featured-works-title" className={styles.sectionTitle}>Featured works.</h2>
      </div>

      <div className={styles.carouselContainer}>
        {/* Left scroll arrow — visible once cards have moved past the left edge */}
        <button
          className={styles.scrollArrow}
          style={{
            left: 24,
            opacity: canScrollLeft ? 1 : 0,
            pointerEvents: canScrollLeft ? 'auto' : 'none',
            width: ARROW_SIZE,
            height: ARROW_SIZE,
          }}
          aria-label="Scroll left"
          onClick={() => scrollCards('left')}
        >
          <svg width={ARROW_ICON} height={ARROW_ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right scroll arrow — visible while more cards remain to the right */}
        <button
          className={styles.scrollArrow}
          style={{
            right: 24,
            opacity: canScrollRight ? 1 : 0,
            pointerEvents: canScrollRight ? 'auto' : 'none',
            width: ARROW_SIZE,
            height: ARROW_SIZE,
          }}
          aria-label="Scroll right"
          onClick={() => scrollCards('right')}
        >
          <svg width={ARROW_ICON} height={ARROW_ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        <div ref={viewportRef} className={styles.carouselViewport}>
          <div ref={trackRef} className={styles.carouselTrack}>
            {projects.map((project) => (
              <Link
                key={project.title}
                to={project.slug}
                className={styles.card}
              >
                <div className={styles.cardImageWrapper}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardGradient} />
                  <div className={styles.cardArrow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.cardTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            <div className={styles.trackEndSpacer} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
