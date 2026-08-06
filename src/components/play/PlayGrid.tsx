import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from 'react'
import styles from './PlayGrid.module.css'

// Each card sits at a fixed spot on the collage (desktop only).
// `left`/`top` are percentages of the collage box. All cards share one
// width and aspect ratio (set in the CSS) so they read as a matched set.
// `pill` — which side the tag label hangs off, so labels never collide
// with a neighbouring card.
// `accent` — a colour sampled from the artwork, shown as the small dot
// inside the glass tag.
// On small screens all of this is ignored and the cards fall into a
// simple two-column grid.
type PlayProject = {
  title: string
  tag: string
  href: string
  image: string
  accent: string
  left: string
  top: string
  pill: 'left' | 'right'
}

const projects: PlayProject[] = [
  {
    title: 'Kaiyaré',
    tag: 'Illustration & Packaging',
    href: 'https://www.behance.net/gallery/189761117/Concept-Packaging-Design',
    image: '/images/play_kaiyare.webp',
    accent: '#2f5241',
    left: '2%', top: '4%', pill: 'right',
  },
  {
    title: 'Sarang & Ankita',
    tag: 'Brand Identity',
    href: 'https://www.behance.net/gallery/189751407/Brand-Identity-Design-Project',
    image: '/images/play_sarang-ankita.webp',
    accent: '#c96e60',
    left: '24%', top: '24%', pill: 'right',
  },
  {
    title: 'Jashn',
    tag: 'Furniture Design',
    href: 'https://www.behance.net/gallery/189753297/Furniture-Design-Project',
    image: '/images/play_furniture.webp',
    accent: '#b45a2c',
    left: '48%', top: '0%', pill: 'left',
  },
  {
    // No title on hover for this one — the tag is the whole story.
    title: '',
    tag: 'Interior Styling',
    href: 'https://www.behance.net/gallery/118551649/INTERIOR-STYLING-Bedroom',
    image: '/images/play_interior-styling.webp',
    accent: '#3a5734',
    left: '74%', top: '16%', pill: 'left',
  },
  {
    title: 'Snug',
    tag: 'Lighting Design',
    href: 'https://www.behance.net/gallery/120069585/SNUG-Lighting-Design',
    image: '/images/play_snug.webp',
    accent: '#bc6f4a',
    left: '4%', top: '58%', pill: 'right',
  },
  {
    title: 'Fika',
    tag: 'Surface Design',
    href: 'https://www.behance.net/gallery/117506707/FIKA-Placemat-Design',
    image: '/images/play_fika.webp',
    accent: '#5f7f3c',
    left: '38%', top: '66%', pill: 'right',
  },
  {
    title: 'Yoga Bar',
    tag: 'Product Photography',
    href: 'https://www.behance.net/gallery/118597783/YOGA-BAR-Product-Photography',
    image: '/images/play_yoga-bar.webp',
    accent: '#e0b514',
    left: '70%', top: '62%', pill: 'left',
  },
]

type DragState = {
  idx: number
  pointerId: number
  startX: number
  startY: number
  baseX: number
  baseY: number
  moved: boolean
}

export function PlayGrid() {
  // How far each card has been dragged from its home spot.
  const [offsets, setOffsets] = useState(() => projects.map(() => ({ x: 0, y: 0 })))
  // The most recently touched card renders on top of the others.
  const [topIdx, setTopIdx] = useState<number | null>(null)
  const drag = useRef<DragState | null>(null)
  // A drag should not count as a click — this flags the click that
  // immediately follows a drag so the Behance link doesn't open.
  const suppressClick = useRef(false)

  const onPointerDown = (idx: number) => (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    // The phone layout is a plain grid — no dragging there.
    if (window.matchMedia('(max-width: 900px)').matches) return
    const o = offsets[idx]
    drag.current = {
      idx,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      baseX: o.x,
      baseY: o.y,
      moved: false,
    }
    setTopIdx(idx)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const d = drag.current
    if (!d || d.pointerId !== e.pointerId) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.moved && Math.hypot(dx, dy) > 4) d.moved = true
    if (!d.moved) return
    setOffsets((prev) => {
      const next = prev.slice()
      next[d.idx] = { x: d.baseX + dx, y: d.baseY + dy }
      return next
    })
  }

  const onPointerEnd = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const d = drag.current
    if (!d || d.pointerId !== e.pointerId) return
    suppressClick.current = d.moved
    drag.current = null
  }

  const onClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (suppressClick.current) {
      e.preventDefault()
      suppressClick.current = false
    }
  }

  return (
    <section className={styles.section} aria-labelledby="play-title">
      {/* Faint ruled grid, masked so it dissolves near the edges. */}
      <div className={styles.gridBackdrop} aria-hidden="true" />

      {/* This page is a single screen, so the reveal is a plain CSS fade on
          load rather than a scroll-driven one — nothing to scroll into. */}
      <div className={styles.fadeWrap}>
        <h1 id="play-title" className={styles.pageTitle}>
          a little of everything
        </h1>

        <div className={styles.collage}>
          {projects.map((project, idx) => (
            <a
              key={project.tag}
              // Only cards with a title extend their label on hover — Interior
              // Styling has none, so its tag stays as-is.
              className={`${styles.card} ${project.title ? styles.hasTitle : ''}`}
              style={{
                left: project.left,
                top: project.top,
                transform: `translate(${offsets[idx].x}px, ${offsets[idx].y}px)`,
                zIndex: topIdx === idx ? 5 : undefined,
              }}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={onPointerDown(idx)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
              onClick={onClick}
              onDragStart={(e) => e.preventDefault()}
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
                  <span className={styles.dot} style={{ backgroundColor: project.accent }} aria-hidden="true" />
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
