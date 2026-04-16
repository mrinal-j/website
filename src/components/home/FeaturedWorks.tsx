import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import styles from './FeaturedWorks.module.css'

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
  const [translateX, setTranslateX] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      const scrolled = -(rect.top - 60)
      const totalScroll = sectionHeight - viewportHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      const maxTranslate = (projects.length - 1) * (window.innerWidth - 100)
      setTranslateX(progress * maxTranslate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
            style={{ transform: `translateX(-${translateX}px)` }}
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
