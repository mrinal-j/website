import type { CSSProperties } from 'react'
import { useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
import { projectsInCategory, workCategories, type Project } from '~/data/projects'
import styles from './FeaturedWorks.module.css'

// Home page work grid. A row of category tabs sits on a hairline at the top;
// clicking one swaps the cards below it in place. The cards run in two columns
// whose photo heights differ, so the columns stagger rather than line up.
//
// The tabs scroll out of sight while you read, so the categories you are not
// looking at are offered again in a "more work" row at the end of the list.
export function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const { fadeStyle } = useSectionFadeIn(sectionRef)
  const [activeCategory, setActiveCategory] = useState(workCategories[0].label)

  const shown = useMemo(() => projectsInCategory(activeCategory), [activeCategory])
  const leftColumn = shown.filter((_, i) => i % 2 === 0)
  const rightColumn = shown.filter((_, i) => i % 2 === 1)
  const otherCategories = workCategories.filter((c) => c.label !== activeCategory)

  // Switching from the bottom of the list would otherwise leave you stranded
  // at the end of a category you have not seen the start of.
  function showCategory(label: string, scrollBackUp: boolean) {
    setActiveCategory(label)
    const section = sectionRef.current
    if (!scrollBackUp || !section) return
    const top = section.getBoundingClientRect().top + window.scrollY
    if (window.__lenis) window.__lenis.scrollTo(top)
    else window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      id="featured-works"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="featured-works-title"
    >
      <div className={styles.fadeWrap} style={fadeStyle}>
        <div className={styles.tabBar}>
          <h2 id="featured-works-title" className={styles.heading}>Work</h2>
          <div className={styles.tabs} role="group" aria-label="Filter work by category">
            {workCategories.map((category) => {
              const isActive = category.label === activeCategory
              return (
                <button
                  key={category.label}
                  type="button"
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                  aria-pressed={isActive}
                  onClick={() => showCategory(category.label, false)}
                >
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            {leftColumn.map((project, i) => (
              <ProjectCard key={project.id} project={project} order={i * 2} />
            ))}
          </div>
          <div className={styles.column}>
            {rightColumn.map((project, i) => (
              <ProjectCard key={project.id} project={project} order={i * 2 + 1} />
            ))}
          </div>
        </div>

        <div className={styles.moreRow} aria-label="See another category of work">
          <span className={styles.moreLabel}>More work</span>
          {otherCategories.map((category) => (
            <button
              key={category.label}
              type="button"
              className={styles.moreLink}
              onClick={() => showCategory(category.label, true)}
            >
              {category.label}
              <svg
                className={styles.moreArrow}
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5h12M9.5 1.5L13 5l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// `order` is the card's place in the category list. On a phone the two columns
// collapse into one stack and this puts the cards back into that order.
function ProjectCard({ project, order }: { project: Project; order: number }) {
  const isExternal = project.slug.startsWith('http')

  const cardStyle = {
    '--card-h': `${project.cardHeight}px`,
    '--order': order,
  } as CSSProperties

  const inner = (
    <>
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
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </>
  )

  return isExternal ? (
    <a
      href={project.slug}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      style={cardStyle}
    >
      {inner}
    </a>
  ) : (
    <Link to={project.slug} className={styles.card} style={cardStyle}>
      {inner}
    </Link>
  )
}
