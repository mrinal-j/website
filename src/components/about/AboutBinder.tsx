import { useState } from 'react'
import styles from './AboutBinder.module.css'

const CARD_BG = '#faf8f4'

const TABS = [
  { id: 'about',   label: 'About me',        color: CARD_BG },
  { id: 'work',    label: 'How I work',       color: '#ede9f6' },
  { id: 'tools',   label: 'Tool stack',       color: '#f5efd6' },
  { id: 'outside', label: 'Outside of work',  color: '#ddeee8' },
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
    <>
      <h2 className={styles.tabHeading}>About me</h2>
      <p className={styles.tabBody}>
        I'm Mrinal — a designer working at the intersection of research, strategy, and real-world impact.
        I turn complex problems into clear, human experiences: from service blueprints to visual systems.
      </p>
      <p className={styles.tabBody}>
        With a background spanning UX research, service design, and communications strategy,
        I'm most energised when design has stakes — when it genuinely changes how people experience the world around them.
      </p>
    </>
  )
}

function HowIWorkContent() {
  return (
    <>
      <h2 className={styles.tabHeading}>How I work</h2>
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
    </>
  )
}

function ToolStackContent() {
  return (
    <>
      <h2 className={styles.tabHeading}>Tool stack</h2>
      <div className={styles.toolGrid}>
        {TOOLS.map(t => (
          <div key={t.category} className={styles.toolCategory}>
            <p className={styles.toolCategoryLabel}>{t.category}</p>
            <p className={styles.toolList}>{t.list}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function OutsideContent() {
  return (
    <>
      <h2 className={styles.tabHeading}>Outside of work</h2>
      <ul className={styles.interestList}>
        <li className={styles.interestItem}><strong>Reading</strong> — mostly non-fiction, design theory, and the occasional novel that takes over my week.</li>
        <li className={styles.interestItem}><strong>Making things</strong> — ceramics, illustration, anything that lets my hands do the thinking.</li>
        <li className={styles.interestItem}><strong>Staying curious</strong> — I'll pick up a new skill, take a class, or dive into a topic just because it interests me.</li>
        <li className={styles.interestItem}><strong>Good food, good company</strong> — strong opinions about coffee and even stronger ones about where to eat.</li>
      </ul>
    </>
  )
}

const CONTENT = [AboutMeContent, HowIWorkContent, ToolStackContent, OutsideContent]

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
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

  return (
    <div className={styles.wrapper}>

      {/* Content panel — opens in the space above the tab stack */}
      <div className={`${styles.contentArea} ${active !== null ? styles.contentOpen : ''}`}>
        {Content && (
          <div
            className={styles.card}
            style={{ backgroundColor: TABS[active!].color }}
          >
            <div className={styles.body}>
              <Content />
            </div>
          </div>
        )}
      </div>

      {/* Tab stack — pinned to the bottom edge, full viewport width */}
      <div className={styles.tabStack}>
        {TABS.map((tab, i) => {
          const isOpen = i === active
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${isOpen ? styles.tabActive : ''}`}
              style={{ backgroundColor: tab.color }}
              onClick={(e) => {
                toggle(i)
                ;(e.currentTarget as HTMLButtonElement).blur()
              }}
              aria-expanded={isOpen}
              aria-label={tab.label}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              <Chevron open={isOpen} />
            </button>
          )
        })}
      </div>

    </div>
  )
}
