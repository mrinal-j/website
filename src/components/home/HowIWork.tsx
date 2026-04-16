import { useEffect, useRef, useState } from 'react'
import styles from './HowIWork.module.css'

const steps = [
  {
    number: '01',
    title: 'Research as foundation',
    body: "I start with understanding, not assumptions. User interviews, journey mapping, behavioral research. What motivates people? Where do systems break down? What's the gap between intention and action?",
  },
  {
    number: '02',
    title: 'Strategy before screens',
    body: 'Good design serves clear goals. I map service blueprints, align stakeholder needs, define success metrics that matter -- not just engagement, but actual impact.',
  },
  {
    number: '03',
    title: 'Design that scales',
    body: 'Wireframes, prototypes, visual systems. But also: design systems that work across contexts, communications strategies that build trust, experiences that serve both business and social outcomes.',
  },
  {
    number: '04',
    title: 'Iteration with evidence',
    body: 'Test, learn, refine. User testing, A/B testing, impact measurement. Design is never done -- it evolves with the people it serves.',
  },
]

export function HowIWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalScroll))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length))
  const timelineFill = steps.length > 1
    ? (activeStep / (steps.length - 1)) * 100
    : 0

  // Auto-scroll the steps container so the latest revealed step is visible
  useEffect(() => {
    const el = stepRefs.current[activeStep]
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeStep])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <h2 className={styles.title}>How I work?</h2>
        <div className={styles.layout}>
          {/* Left: stacking steps */}
          <div ref={scrollRef} className={styles.stepsScroll}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el }}
                className={`${styles.step} ${i <= activeStep ? styles.visible : ''}`}
              >
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>

          {/* Right: vertical timeline */}
          <div className={styles.timeline}>
            <div className={styles.timelineTrack} />
            <div
              className={styles.timelineFill}
              style={{ height: `${timelineFill}%` }}
            />
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`${styles.timelineDot} ${i <= activeStep ? styles.timelineDotActive : ''}`}
                style={{ top: `${(i / (steps.length - 1)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
