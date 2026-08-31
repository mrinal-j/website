import { useEffect, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'

// Clicking a link inside the site swaps the page content without a real reload,
// so the browser keeps whatever scroll position you were already at. That is why
// a project page could open halfway down. This component takes over that job:
//
//   - going to a new page   -> start at the top
//   - a link with a #target -> scroll to that section
//   - Back / Forward        -> return to exactly where you were

// How long we keep insisting on the new position. A case study loads its images
// and sections in over a few frames, and each of those can shift the page under
// us, so a single jump is not always enough.
const HOLD_MS = 700

function jumpTo(y: number) {
  // Move the page itself, and tell Lenis (the smooth-scrolling library) about it
  // too, so the two agree on where we are. Lenis keeps its own idea of the
  // scroll position and would otherwise animate the page straight back down.
  window.scrollTo(0, y)
  window.__lenis?.scrollTo(y, { immediate: true, force: true })
}

export function ScrollBehavior() {
  const location = useRouterState({ select: (s) => s.location })

  // Every entry in the browser's history carries an id. We use it to remember
  // where the reader was on each page they have already visited this session.
  const entryId = location.state.__TSR_key ?? location.state.key ?? location.href
  const positions = useRef(new Map<string, number>())
  const currentEntry = useRef<string | null>(null)
  const holding = useRef(false)

  useEffect(() => {
    const remember = () => {
      // Ignore the scrolling we are doing ourselves just after a page change.
      if (holding.current || !currentEntry.current) return
      positions.current.set(currentEntry.current, window.scrollY)
    }
    window.addEventListener('scroll', remember, { passive: true })
    return () => window.removeEventListener('scroll', remember)
  }, [])

  useEffect(() => {
    const previous = currentEntry.current
    currentEntry.current = entryId

    // The first page load is already handled by the script in the document head,
    // and staying on the same history entry means nothing actually moved.
    if (previous === null || previous === entryId) return

    // A page we have seen before (Back / Forward) returns to where it was;
    // anything new starts at the top.
    const saved = positions.current.get(entryId)
    const hash = location.hash

    // Worked out fresh each time, because a #target section may not exist yet at
    // the moment the link is clicked, and its position moves as the page settles.
    const apply = () => {
      if (hash) {
        const el = document.getElementById(hash)
        if (el) jumpTo(el.getBoundingClientRect().top + window.scrollY)
        return
      }
      jumpTo(saved ?? 0)
    }

    holding.current = true
    apply()

    // Keep re-applying it while the new page settles, but let go the moment the
    // reader scrolls for themselves so we are never fighting them.
    const stop = () => {
      holding.current = false
      clearInterval(ticker)
      clearTimeout(timer)
      for (const event of release) window.removeEventListener(event, stop)
    }

    const release = ['wheel', 'touchstart', 'keydown'] as const
    const ticker = setInterval(apply, 50)
    const timer = setTimeout(stop, HOLD_MS)
    for (const event of release) {
      window.addEventListener(event, stop, { passive: true, once: true })
    }

    return stop
  }, [entryId, location.hash])

  return null
}
