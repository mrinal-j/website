import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { SectionLabel } from '~/components/SectionLabel'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
import { projects } from '~/data/projects'
import styles from './FeaturedWorks.module.css'

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
