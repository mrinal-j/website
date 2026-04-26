import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

// Always start at the top of the page on reload (don't restore previous scroll).
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
