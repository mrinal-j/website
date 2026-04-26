import { useEffect, useRef, useState } from 'react'

type Props = {
  /** The final number to count up to. */
  to: number
  /** How long the count-up takes, in milliseconds. */
  duration?: number
  /** Optional className passed through to the wrapping span. */
  className?: string
}

/**
 * Counts up from 0 to `to` the first time it scrolls into view.
 * Format includes thousands separators (e.g. 90,000).
 */
export function CountUp({ to, duration = 1600, className }: Props) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const runAnimation = () => {
      if (startedRef.current) return
      startedRef.current = true
      const start = performance.now()
      const interval = setInterval(() => {
        const elapsed = performance.now() - start
        const t = Math.min(elapsed / duration, 1)
        // ease-out cubic so it starts fast and slows to the final value
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(to * eased))
        if (t >= 1) clearInterval(interval)
      }, 16)
    }

    const checkVisible = () => {
      if (startedRef.current) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // trigger when ~30% of the element has scrolled into view
      if (rect.top < vh * 0.85 && rect.bottom > 0) runAnimation()
    }

    checkVisible()
    window.addEventListener('scroll', checkVisible, { passive: true })
    window.addEventListener('resize', checkVisible)
    return () => {
      window.removeEventListener('scroll', checkVisible)
      window.removeEventListener('resize', checkVisible)
    }
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
    </span>
  )
}
