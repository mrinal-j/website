import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { SectionLabel } from '~/components/SectionLabel'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
import styles from './FeaturedWorks.module.css'

// `x` — horizontal crop: 0% = left edge, 50% = center, 100% = right edge
// `y` — vertical crop:   0% = top edge,  50% = center, 100% = bottom edge
// `hoverImage` — optional; the card photo cross-fades to this on hover.
const projects = [
  {
    slug: '/in-the-loop',
    title: 'In the Loop',
    description: 'Redefining professional mobility as a tool for community building and intentional growth.',
    tags: ['UX Research', 'Service Design', 'Brand Strategy', 'Systems Thinking', 'Product Design', 'Adobe CC', 'Figma'],
    image: '/images/in-the-loop cover.webp',
    hoverImage: '/images/iHkx9gYek2TcjPXt4cRuVfh1s.webp',
    x: '50%', y: '50%',
  },
  {
    slug: 'https://legacy.mrinaljadhav.com/know-your-vote',
    title: 'Know your Vote',
    description: 'A design intervention that transforms how voters access, understand, and engage with electoral information.',
    tags: ['Design for Impact', 'Service Design', 'Service Blueprint', 'Design Strategy', 'Figma', 'Prototyping', 'Digital Design', 'Print Design'],
    image: '/images/PN2PjVKa1k8qTqovQptaN279mD4.webp',
    hoverImage: '/images/know_your_vote_banner.webp',
    x: '50%', y: '68%',
  },
  {
    slug: 'https://legacy.mrinaljadhav.com/housing-works',
    title: 'Reimaging Housing Works, New York',
    description: 'Transforming their thrift shop into a global retail destination that fuels its mission of community empowerment.',
    tags: ['Brand Strategy', 'Retail Experience Design', 'Customer Experience (CX)', 'Design for Social Impact', 'Design Strategy', 'Storytelling'],
    image: '/images/housing_works_cover.webp',
    hoverImage: '/images/housing_works_banner.webp',
    x: '50%', y: '50%',
  },
  {
    slug: '/kaaro',
    title: 'Kaaro',
    description: 'Branding, strategy and product design for a handcrafted jewelry brand.',
    tags: ['Brand Identity', 'Brand Strategy', 'Market Research', 'Logo Design', 'Jewelry Design', 'Photography'],
    image: '/images/kaaro.webp',
    hoverImage: '/images/kaaro_banner.webp',
    x: '50%', y: '50%',
  },
]

export function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const { fadeStyle } = useSectionFadeIn(sectionRef)

  return (
    <section id="featured-works" ref={sectionRef} className={styles.section}>
      <div className={styles.fadeWrap} style={fadeStyle}>
        <div className={styles.header}>
          <h2 id="featured-works-title" className={styles.srOnly}>Featured works</h2>
          <SectionLabel title="FEATURED WORKS" />
        </div>

        <div className={styles.grid}>
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
                {project.hoverImage && (
                  <img
                    src={project.hoverImage}
                    alt=""
                    aria-hidden="true"
                    className={`${styles.cardImage} ${styles.cardImageHover}`}
                  />
                )}
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
        </div>
      </div>
    </section>
  )
}
