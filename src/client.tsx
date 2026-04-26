import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

// Stop the browser from jumping back to the last scroll position on refresh.
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  // Only force-top on a fresh load (not on back/forward navigation).
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (!nav || nav.type !== 'back_forward') {
    window.scrollTo(0, 0)
  }
}

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
