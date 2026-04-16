import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import styles from './FeaturedWorks.module.css'

const DESKTOP_SIDE_PADDING = 80
const MOBILE_SIDE_PADDING = 24
const CARD_GAP = 20
const DESKTOP_CARD_PEEK = 140
const MOBILE_CARD_PEEK = 36

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
  const sectionRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(DESKTOP_SIDE_PADDING)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const totalScroll = sectionHeight - viewportHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      const isMobile = window.innerWidth <= 767
      const sidePadding = isMobile ? MOBILE_SIDE_PADDING : DESKTOP_SIDE_PADDING
      const cardPeek = isMobile ? MOBILE_CARD_PEEK : DESKTOP_CARD_PEEK
      const cardWidth = window.innerWidth - sidePadding - cardPeek
      const step = cardWidth + CARD_GAP
      const maxTranslate = (projects.length - 1) * step
      setTranslateX(sidePadding - progress * maxTranslate)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyWrapper}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Featured works.</h2>
        </div>
        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(${translateX}px)` }}
          >
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
          </div>
        </div>
      </div>
    </section>
  )
}
