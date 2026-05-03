import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '~/components/SectionLabel'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
import styles from './HowIWork.module.css'

const steps = [
  {
    number: '01',
    title: 'Research as foundation',
    body: 'I start with understanding, not assumptions. User interviews, journey mapping, behavioural research — what motivates people and what stands in their way.',
  },
  {
    number: '02',
    title: 'Strategy before screens',
    body: 'Good design serves clear goals. I map service blueprints, align stakeholder needs, define success metrics that matter — not just engagement, but actual impact.',
  },
  {
    number: '03',
    title: 'Design that scales',
    body: 'Wireframes, prototypes, visual systems. But also: design systems that work across contexts, communications strategies that build trust, experiences that serve both business and social outcomes.',
  },
  {
    number: '04',
    title: 'Iteration with evidence',
    body: 'Test, learn, refine. User testing, A/B testing, impact measurement. Design is never done — it evolves with the people it serves.',
  },
]

const MOBILE_MQ = '(max-width: 1023px)'

export function HowIWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { fadeStyle } = useSectionFadeIn(sectionRef)
  const [activeStep, setActiveStep] = useState(0)
  const [mobileLayout, setMobileLayout] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ)
    const apply = () => setMobileLayout(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || mobileLayout) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalScroll))
      // Map progress to step index (each step gets an equal slice)
      const step = Math.min(steps.length - 1, Math.floor(p * steps.length))
      setActiveStep(step)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileLayout])

  const timelineFill = steps.length > 1
    ? (activeStep / (steps.length - 1)) * 100
    : 0

  return (
    <section ref={sectionRef} className={styles.section}>
      <div
        className={styles.sticky}
        style={mobileLayout ? undefined : fadeStyle}
      >
        <h2 className={styles.srOnly}>How I work</h2>
        <div className={styles.sectionLabelWrap}>
          <SectionLabel title="HOW I WORK" />
        </div>
        <div className={styles.contentRow}>
          {/* Left: one step at a time */}
          <div className={styles.stepsArea}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`${styles.step} ${
                  mobileLayout
                    ? styles.visible
                    : i === activeStep
                      ? styles.visible
                      : ''
                }`}
              >
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>

          {/* Right: vertical timeline — aligned with step text */}
          <div className={styles.timeline}>
            <div className={styles.timelineTrack} />
            <div
              className={styles.timelineFill}
              style={{ height: `${timelineFill}%` }}
            />
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`${styles.timelineDot} ${
                  mobileLayout || i <= activeStep ? styles.timelineDotActive : ''
                }`}
                style={{ top: `${(i / (steps.length - 1)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
