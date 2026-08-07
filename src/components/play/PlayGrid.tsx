import type { CSSProperties } from 'react'
import styles from './PlayGrid.module.css'

// Each card sits at a fixed spot on the collage (desktop only).
// `left`/`top` are percentages of the collage box. All cards share one
// width and aspect ratio (set in the CSS) so they read as a matched set.
// `pill` — which side the tag label hangs off, so labels never collide
// with a neighbouring card.
// `bob` — the gentle up-and-down drift each card runs on the spot.
// `dur` is how long one round trip takes and `delay` is negative so every
// card starts part-way through its own cycle, meaning they never bob in
// unison and nothing has to wait to get going. `shift` is how far it
// travels.
// `mob` — the phone layout nudges. The cards still flow in two columns,
// but each is shifted and resized a little so the result reads as a loose
// cluster rather than a ruled grid.
type PlayProject = {
  title: string
  tag: string
  href: string
  image: string
  left: string
  top: string
  pill: 'left' | 'right'
  bob: { dur: string; delay: string; shift: string }
  mob: { x: string; y: string; w: string }
}

const projects: PlayProject[] = [
  {
    title: 'Kaiyaré',
    tag: 'Illustration & Packaging',
    href: 'https://www.behance.net/gallery/189761117/Concept-Packaging-Design',
    image: '/images/play_kaiyare.webp',
    left: '3%', top: '8%', pill: 'right',
    bob: { dur: '6.4s', delay: '-0.3s', shift: '7px' },
    mob: { x: '-6px', y: '0px', w: '104%' },
  },
  {
    title: 'Sarang & Ankita',
    tag: 'Brand Identity',
    href: 'https://www.behance.net/gallery/189751407/Brand-Identity-Design-Project',
    image: '/images/play_sarang-ankita.webp',
    left: '28%', top: '0%', pill: 'right',
    bob: { dur: '7.6s', delay: '-2.1s', shift: '6px' },
    mob: { x: '6px', y: '30px', w: '92%' },
  },
  {
    title: 'Jashn',
    tag: 'Furniture Design',
    href: 'https://www.behance.net/gallery/189753297/Furniture-Design-Project',
    image: '/images/play_furniture.webp',
    left: '59%', top: '5%', pill: 'left',
    bob: { dur: '5.9s', delay: '-3.4s', shift: '8px' },
    mob: { x: '2px', y: '14px', w: '97%' },
  },
  {
    // No title on hover for this one — the tag is the whole story.
    title: '',
    tag: 'Interior Styling',
    href: 'https://www.behance.net/gallery/118551649/INTERIOR-STYLING-Bedroom',
    image: '/images/play_interior-styling.webp',
    left: '81%', top: '27%', pill: 'left',
    bob: { dur: '8.2s', delay: '-1.1s', shift: '5px' },
    mob: { x: '-4px', y: '-8px', w: '102%' },
  },
  {
    title: 'Snug',
    tag: 'Lighting Design',
    href: 'https://www.behance.net/gallery/120069585/SNUG-Lighting-Design',
    image: '/images/play_snug.webp',
    left: '1%', top: '55%', pill: 'right',
    bob: { dur: '7.1s', delay: '-4.2s', shift: '9px' },
    mob: { x: '4px', y: '22px', w: '95%' },
  },
  {
    title: 'Fika',
    tag: 'Lifestyle Product Design',
    href: 'https://www.behance.net/gallery/117506707/FIKA-Placemat-Design',
    image: '/images/play_fika.webp',
    left: '29%', top: '69%', pill: 'right',
    bob: { dur: '6.7s', delay: '-1.8s', shift: '6px' },
    mob: { x: '-5px', y: '-6px', w: '103%' },
  },
  {
    title: 'Yoga Bar',
    tag: 'Product Photography',
    href: 'https://www.behance.net/gallery/118597783/YOGA-BAR-Product-Photography',
    image: '/images/play_yoga-bar.webp',
    left: '61%', top: '63%', pill: 'left',
    bob: { dur: '7.9s', delay: '-2.7s', shift: '7px' },
    mob: { x: '5px', y: '26px', w: '94%' },
  },
]

export function PlayGrid() {
  return (
    <section className={styles.section} aria-labelledby="play-title">
      {/* Faint ruled grid, masked so it dissolves near the edges. */}
      <div className={styles.gridBackdrop} aria-hidden="true" />

      {/* This page is a single screen, so the reveal is a plain CSS fade on
          load rather than a scroll-driven one — nothing to scroll into. */}
      <div className={styles.fadeWrap}>
        <div className={styles.collage}>
          <h1 id="play-title" className={styles.centerText}>
            a little of{' '}
            <span className={styles.underlined}>
              everything
              {/* Hand-drawn underline: one quick pen stroke that wanders up
                  and down rather than running straight. The dash pattern is
                  mostly solid with hairline gaps, which breaks up the ink
                  just enough to read as a dry pen rather than a printed rule,
                  and the mask thins both ends away so the stroke tails off
                  instead of stopping dead. It sits narrower than the word and
                  slightly off-centre, the way a real one would. */}
              <svg
                className={styles.squiggle}
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="playSquiggleFade" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.14" stopColor="#fff" stopOpacity="1" />
                    <stop offset="0.82" stopColor="#fff" stopOpacity="1" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <mask id="playSquiggleMask">
                    <rect width="200" height="20" fill="url(#playSquiggleFade)" />
                  </mask>
                </defs>
                <path
                  d="M4 10.4C13 4.8 23 15.8 33 10.2C43 5.2 54 15.2 64 9.8C75 4.6 85 16 96 10.6C106 5.4 116 14.8 127 10C137 5 147 15.6 158 10.4C168 5.6 178 14.6 188 10.2C192 8.4 195 11.2 197 10"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="26 0.8 34 0.6 22 0.9 30 0.7"
                  mask="url(#playSquiggleMask)"
                />
              </svg>
            </span>
          </h1>

          {projects.map((project) => (
            <a
              key={project.tag}
              // Only cards with a title extend their label on hover — Interior
              // Styling has none, so its tag stays as-is.
              className={`${styles.card} ${project.title ? styles.hasTitle : ''}`}
              style={{
                left: project.left,
                top: project.top,
                '--bob-dur': project.bob.dur,
                '--bob-delay': project.bob.delay,
                '--bob-shift': project.bob.shift,
                '--mob-x': project.mob.x,
                '--mob-y': project.mob.y,
                '--mob-w': project.mob.w,
              } as CSSProperties}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* `cardMedia` is what the pill is pinned to, so the label sits
                  against the photo rather than the whole card (which also
                  holds the title shown on phones). */}
              <div className={styles.cardMedia}>
                <div className={styles.cardImageWrapper}>
                  <img
                    src={project.image}
                    alt={project.title || project.tag}
                    className={styles.cardImage}
                    draggable={false}
                  />
                </div>

                {/* Glass label on the image, hanging off one edge. On hover it
                    widens to append the project name after the tag. */}
                <span
                  className={`${styles.pill} ${project.pill === 'left' ? styles.pillLeft : styles.pillRight}`}
                >
                  <span className={styles.tag}>{project.tag}</span>
                  {project.title && (
                    <span className={styles.reveal} aria-hidden="true">
                      <span className={styles.sep}>|</span>
                      <span className={styles.title}>{project.title}</span>
                    </span>
                  )}
                </span>
              </div>

              {/* Phones can't hover, so the name is spelled out under the card. */}
              {project.title && (
                <span className={styles.mobileTitle} aria-hidden="true">{project.title}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
