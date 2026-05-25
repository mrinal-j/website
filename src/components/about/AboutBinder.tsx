import { useState } from 'react'
import styles from './AboutBinder.module.css'

// Each tab is a protruding "bump" at the top of its row.
// bumpLeft / bumpWidth are %s — staggered so the bumps cascade like file folders.
const TABS = [
  { id: 'about',   label: 'About me',       fill: '#013533', text: '#DFC797', bumpLeft: 22, bumpWidth: 28 }, // Green   / Cream
  { id: 'work',    label: 'How I work',      fill: '#F7DEC0', text: '#282627', bumpLeft: 50, bumpWidth: 30 }, // Cream   / Black
  { id: 'tools',   label: 'Tool stack',      fill: '#5D372A', text: '#E9641B', bumpLeft: 14, bumpWidth: 30 }, // Bistre  / Orange
  { id: 'outside', label: 'Outside of work', fill: '#FED176', text: '#2F3B3F', bumpLeft: 56, bumpWidth: 32 }, // Yellow  / Blue Black
]

const HOW_I_WORK = [
  {
    number: '01',
    title: 'Research as foundation',
    body: 'User interviews, journey mapping, behavioural research — understanding what motivates people and what stands in their way.',
  },
  {
    number: '02',
    title: 'Strategy before screens',
    body: 'Service blueprints, stakeholder alignment, and success metrics that measure actual impact — not just engagement.',
  },
  {
    number: '03',
    title: 'Design that scales',
    body: 'Wireframes, prototypes, and visual systems built to work across contexts, channels, and teams.',
  },
  {
    number: '04',
    title: 'Iteration with evidence',
    body: 'User testing, A/B testing, impact measurement. Design evolves with the people it serves.',
  },
]

const TOOLS = [
  { category: 'Research',  list: 'Interviews, Maze, Dovetail, Notion' },
  { category: 'Design',    list: 'Figma, FigJam, Framer' },
  { category: 'Strategy',  list: 'Miro, Airtable, service blueprints' },
  { category: 'Delivery',  list: 'Webflow, Notion, Linear' },
]

function AboutMeContent() {
  return (
    <div className={styles.aboutLayout}>
      <img
        src="/images/about_image.webp"
        alt="Mrinal on the Brooklyn Bridge"
        className={styles.aboutPhoto}
      />
      <div className={styles.aboutText}>
        <p className={styles.tabBody}>
          I'm Mrinal — a designer working at the intersection of research, strategy, and real-world impact.
          I turn complex problems into clear, human experiences: from service blueprints to visual systems.
        </p>
        <p className={styles.tabBody}>
          With a background spanning UX research, service design, and communications strategy,
          I'm most energised when design has stakes — when it genuinely changes how people experience the world around them.
        </p>
      </div>
    </div>
  )
}

function HowIWorkContent() {
  return (
    <div className={styles.steps}>
      {HOW_I_WORK.map(s => (
        <div key={s.number} className={styles.step}>
          <span className={styles.stepNum}>{s.number}</span>
          <div>
            <p className={styles.stepTitle}>{s.title}</p>
            <p className={styles.stepDesc}>{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ToolStackContent() {
  return (
    <div className={styles.toolGrid}>
      {TOOLS.map(t => (
        <div key={t.category} className={styles.toolCategory}>
          <p className={styles.toolCategoryLabel}>{t.category}</p>
          <p className={styles.toolList}>{t.list}</p>
        </div>
      ))}
    </div>
  )
}

function OutsideContent() {
  return (
    <ul className={styles.interestList}>
      <li className={styles.interestItem}><strong>Reading</strong> — mostly non-fiction, design theory, and the occasional novel that takes over my week.</li>
      <li className={styles.interestItem}><strong>Making things</strong> — ceramics, illustration, anything that lets my hands do the thinking.</li>
      <li className={styles.interestItem}><strong>Staying curious</strong> — I'll pick up a new skill, take a class, or dive into a topic just because it interests me.</li>
      <li className={styles.interestItem}><strong>Good food, good company</strong> — strong opinions about coffee and even stronger ones about where to eat.</li>
    </ul>
  )
}

const CONTENT = [AboutMeContent, HowIWorkContent, ToolStackContent, OutsideContent]

function CloseIcon() {
  // Up-arrow inside a circle — clicking sends the open tab back to the right.
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M7 12.5L11 8.5L15 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AboutBinder() {
  // null = all tabs minimized (default)
  const [active, setActive] = useState<number | null>(null)
  const Content = active !== null ? CONTENT[active] : null

  const toggle = (i: number) => {
    setActive(prev => (prev === i ? null : i))
  }

  void Content
  return (
    <div className={styles.wrapper}>

      {/* Close button — top-left, only visible when something is open */}
      {active !== null && (
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => setActive(null)}
          style={{ color: TABS[active].text }}
          aria-label="Close panel"
        >
          <CloseIcon />
        </button>
      )}

      {/* Tab stack — vertical strips along the right edge.
          Clicking a strip expands it leftward to fill the panel area. */}
      <div className={styles.tabStack}>
        {TABS.map((tab, i) => {
          const isOpen = i === active
          const TabContent = CONTENT[i]
          return (
            <div
              key={tab.id}
              className={`${styles.tab} ${isOpen ? styles.tabActive : ''}`}
              style={{ ['--fill' as never]: tab.fill, color: tab.text }}
            >
              {/* The fully-filled strip background */}
              <span className={styles.tabBaseline} aria-hidden="true" />
              {/* Content panel — only visible when this tab is active */}
              <div className={styles.tabContent} aria-hidden={!isOpen}>
                <TabContent />
              </div>
              {/* The rotated label on the left edge — also the clickable trigger */}
              <button
                type="button"
                className={styles.tabLabel}
                onClick={(e) => {
                  toggle(i)
                  ;(e.currentTarget as HTMLButtonElement).blur()
                }}
                aria-expanded={isOpen}
                aria-label={tab.label}
              >
                {tab.label}
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}
