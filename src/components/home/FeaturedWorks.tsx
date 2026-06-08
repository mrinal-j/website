import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { SectionLabel } from '~/components/SectionLabel'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
import styles from './FeaturedWorks.module.css'

const CARD_GAP = 20
const ARROW_SIZE = 48
const ARROW_ICON = 18

// `x` — horizontal crop: 0% = left edge, 50% = center, 100% = right edge
// `y` — vertical crop:   0% = top edge,  50% = center, 100% = bottom edge
const projects = [
  {
    slug: '/in-the-loop',
    title: 'In the Loop',
    description: 'Redefining professional mobility as a tool for community building and intentional growth.',
    tags: ['UX Research', 'Service Design', 'Brand Strategy', 'Systems Thinking', 'Product Design', 'Adobe CC', 'Figma'],
    image: '/images/in-the-loop cover.webp',
    x: '50%', y: '50%',
  },
  {
    slug: 'https://legacy.mrinaljadhav.com/know-your-vote',
    title: 'Know your Vote',
    description: 'A design intervention that transforms how voters access, understand, and engage with electoral information.',
    tags: ['Design for Impact', 'Service Design', 'Service Blueprint', 'Design Strategy', 'Figma', 'Prototyping', 'Digital Design', 'Print Design'],
    image: '/images/PN2PjVKa1k8qTqovQptaN279mD4.webp',
    x: '50%', y: '68%',
  },
  {
    slug: 'https://legacy.mrinaljadhav.com/housing-works',
    title: 'Reimaging Housing Works, New York',
    description: 'Transforming their thrift shop into a global retail destination that fuels its mission of community empowerment.',
    tags: ['Brand Strategy', 'Retail Experience Design', 'Customer Experience (CX)', 'Design for Social Impact', 'Design Strategy', 'Storytelling'],
    image: '/images/DIQbZGpjnsJJT6IXdEaM4e7u1mw.webp',
    x: '100%', y: '50%',
  },
  {
    slug: 'https://legacy.mrinaljadhav.com/kaaro',
    title: 'Kaaro',
    description: 'Branding, strategy and product design for a handcrafted jewelry brand.',
    tags: ['Brand Identity', 'Brand Strategy', 'Market Research', 'Logo Design', 'Jewelry Design', 'Photography'],
    image: '/images/kaaro.webp',
    x: '50%', y: '50%',
  },
]

export function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const { fadeStyle } = useSectionFadeIn(sectionRef)
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

    // We intercept wheel events in the CAPTURE phase on the window so our
    // handler runs BEFORE Lenis (which also listens on the window). This lets
    // us block Lenis from processing the vertical component of diagonal
    // gestures that we want to turn into horizontal carousel movement.
    let resumeTimer: ReturnType<typeof setTimeout> | null = null

    const handleWheel = (e: WheelEvent) => {
      // Only act on events whose target is inside our carousel.
      if (!viewport.contains(e.target as Node)) return

      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      // Pure vertical gesture → let Lenis scroll the page.
      if (absY > absX) return

      // Horizontal-dominant gesture → scroll the carousel.
      const { scrollLeft, scrollWidth, clientWidth } = viewport
      const atStart = scrollLeft <= 1
      const atEnd = scrollLeft >= scrollWidth - clientWidth - 1
      const goingForward = e.deltaX > 0

      // At a boundary scrolling further outward → let the page scroll.
      if ((goingForward && atEnd) || (!goingForward && atStart)) return

      // Stop Lenis so it doesn't process the vertical component of this
      // diagonal gesture. We'll resume it shortly after scrolling stops.
      window.__lenis?.stop()
      if (resumeTimer) clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => window.__lenis?.start(), 150)

      // Block the event from reaching Lenis and the browser's default handler.
      e.preventDefault()
      e.stopImmediatePropagation()
      viewport.scrollBy({ left: e.deltaX })
    }

    checkScroll()
    viewport.addEventListener('scroll', checkScroll, { passive: true })
    // Capture phase = runs before Lenis's handler on the window.
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      viewport.removeEventListener('scroll', checkScroll)
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('resize', checkScroll)
      if (resumeTimer) clearTimeout(resumeTimer)
      window.__lenis?.start()
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
    <section id="featured-works" ref={sectionRef} className={styles.section}>
      <div className={styles.fadeWrap} style={fadeStyle}>
        <div className={styles.header}>
          <h2 id="featured-works-title" className={styles.srOnly}>Featured works</h2>
          <SectionLabel title="FEATURED WORKS" />
        </div>

        <div className={styles.carouselContainer}>
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
              {projects.map((project) => {
                const isExternal = project.slug.startsWith('http')
                const CardWrapper = isExternal
                  ? (props: any) => <a href={project.slug} target="_blank" rel="noopener noreferrer" {...props} />
                  : (props: any) => <Link to={project.slug} {...props} />
                return (
                <CardWrapper
                  key={project.title}
                  className={styles.card}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.cardImage}
                      style={{ objectPosition: `${project.x} ${project.y}` }}
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
                </CardWrapper>
                )
              })}
              <div className={styles.trackEndSpacer} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
