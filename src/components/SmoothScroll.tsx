import { useEffect } from 'react'
import Lenis from 'lenis'

// Expose the Lenis instance so other components can pause/resume it
// (e.g. the horizontal carousel pauses vertical smooth scroll while active).
declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.5,
      syncTouch: true,
    })

    window.__lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
