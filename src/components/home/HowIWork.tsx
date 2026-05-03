import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '~/components/SectionLabel'
import { useSectionFadeIn } from '~/hooks/useSectionFadeIn'
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

/** Match CSS: phones + tablets use full page scroll (no sticky / step clipping). */
const MOBILE_MQ = '(max-width: 1023px)'

export function HowIWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { fadeStyle } = useSectionFadeIn(sectionRef)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [progress, setProgress] = useState(0)
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
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileLayout])

  const activeStep = mobileLayout
    ? steps.length - 1
    : Math.min(steps.length - 1, Math.floor(progress * steps.length))
  const timelineFill = steps.length > 1
    ? (activeStep / (steps.length - 1)) * 100
    : 0

  // Auto-scroll the steps list so the active step is fully visible (desktop only).
  // ResizeObserver + delayed run: .visible animates max-height, so layout height may lag one frame.
  useEffect(() => {
    if (mobileLayout) return
    const container = scrollRef.current
    const el = stepRefs.current[activeStep]
    if (!container || !el) return

    const scrollActiveStepIntoView = () => {
      const c = scrollRef.current
      const e = stepRefs.current[activeStep]
      if (!c || !e) return
      const stepTop = e.offsetTop - c.offsetTop
      const stepH = e.offsetHeight
      const viewH = c.clientHeight
      const maxScroll = Math.max(0, c.scrollHeight - viewH)
      const bottomPad = 32
      const stepBottom = stepTop + stepH

      let t = stepTop
      if (stepH + bottomPad <= viewH) {
        if (stepBottom + bottomPad > t + viewH) {
          t = stepBottom + bottomPad - viewH
        }
      } else {
        t = stepTop
      }
      t = Math.max(0, Math.min(t, maxScroll))
      c.scrollTo({ top: t, behavior: 'auto' })
    }

    const ro = new ResizeObserver(scrollActiveStepIntoView)
    ro.observe(el)
    const disconnectId = window.setTimeout(() => ro.disconnect(), 700)

    const id = window.setTimeout(scrollActiveStepIntoView, 560)
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollActiveStepIntoView)
    })

    return () => {
      ro.disconnect()
      window.clearTimeout(id)
      window.clearTimeout(disconnectId)
    }
  }, [activeStep, mobileLayout])

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
        <div className={styles.layout}>
          {/* Left: stacking steps */}
          <div ref={scrollRef} className={styles.stepsScroll}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el }}
            className={`${styles.step} ${mobileLayout || i <= activeStep ? styles.visible : ''}`}
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
                className={`${styles.timelineDot} ${mobileLayout || i <= activeStep ? styles.timelineDotActive : ''}`}
                style={{ top: `${(i / (steps.length - 1)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
