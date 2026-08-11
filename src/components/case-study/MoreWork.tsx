import { Link } from '@tanstack/react-router'
import { projects } from '~/data/projects'
import styles from './MoreWork.module.css'

// Closes off a project page: a "more work" link that points back at the home
// page's featured works, plus a horizontally scrolling strip of the other
// projects. `currentSlug` drops the project you're already reading.
export function MoreWork({ currentSlug }: { currentSlug?: string }) {
  const others = projects.filter((p) => p.slug !== currentSlug)

  return (
    <section className={styles.section} aria-labelledby="more-work-title">
      <Link to="/" hash="featured-works" className={styles.heading}>
        <span id="more-work-title" className={styles.headingText}>more work</span>
        <span className={styles.arrow} aria-hidden="true">
          <svg viewBox="0 0 120 16" fill="none" preserveAspectRatio="none">
            <line className={styles.arrowShaft} x1="1" y1="8" x2="112" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg className={styles.arrowHead} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5L14.5 8L8 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>

      <div className={styles.scroller}>
        <div className={styles.track}>
          {others.map((project) => {
            const isExternal = project.slug.startsWith('http')
            const inner = (
              <>
                <div className={styles.cardImageWrapper}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.cardImage}
                    style={{ objectPosition: `${project.x} ${project.y}` }}
                    loading="lazy"
                  />
                  {project.hoverImage && (
                    <img
                      src={project.hoverImage}
                      alt=""
                      aria-hidden="true"
                      className={`${styles.cardImage} ${styles.cardImageHover}`}
                      loading="lazy"
                    />
                  )}
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </>
            )

            return isExternal ? (
              <a
                key={project.title}
                href={project.slug}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {inner}
              </a>
            ) : (
              <Link key={project.title} to={project.slug} className={styles.card}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
