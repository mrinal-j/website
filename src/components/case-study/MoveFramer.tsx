import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import styles from '../about/CollageEditor.module.css'

/**
 * Dev-only framing tool for the three Proposed Strategy pictures.
 *
 * The pictures sit in a narrow upright strip beside the copy, so most of
 * each one is cropped away. This lets the part that shows be chosen by
 * sliding the picture inside its strip, rather than by guessing numbers
 * and reloading.
 *
 * Nothing here ships: the panel and its reading of saved values are both
 * behind CAN_EDIT, so on the live site the pictures use whatever framing
 * is written into the page itself.
 *
 * Changes are saved in this browser only. "Copy framing" puts the numbers
 * on the clipboard in the shape the page expects, ready to paste in so
 * everyone sees them.
 */

export const CAN_EDIT = import.meta.env.DEV

/** Where the picture sits inside its strip, as percents. 50/50 is centred. */
export interface Framing {
  x: number
  y: number
}

type Framings = Record<number, Framing>

// Bumped whenever framing is baked into the page, so a stale saved value
// in someone's browser is dropped rather than quietly reapplied. Kept
// behind the flag so the name never reaches the shipped bundle.
const STORAGE_KEY = CAN_EDIT ? 'housingWorksMoveFraming-v1' : ''

interface Ctx {
  editing: boolean
  setEditing: (on: boolean) => void
  framings: Framings
  setFraming: (index: number, axis: 'x' | 'y', value: number) => void
  reset: () => void
  labels: string[]
  registerLabels: (labels: string[]) => void
}

const noop = () => {}
const MoveCtx = createContext<Ctx>({
  editing: false,
  setEditing: noop,
  framings: {},
  setFraming: noop,
  reset: noop,
  labels: [],
  registerLabels: noop,
})

export function MoveFramerProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false)
  const [framings, setFramings] = useState<Framings>({})
  const [labels, setLabels] = useState<string[]>([])

  // Saved values are only ever read in dev, so the live page cannot be
  // changed by whatever happens to be in a visitor's browser.
  useEffect(() => {
    if (!CAN_EDIT) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFramings(JSON.parse(raw))
    } catch {
      /* a stored value that will not parse is simply ignored */
    }
  }, [])

  const persist = (next: Framings) => {
    setFramings(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* private browsing, or storage is full: the panel still works */
    }
  }

  const setFraming = (index: number, axis: 'x' | 'y', value: number) => {
    const current = framings[index] ?? { x: 50, y: 50 }
    persist({ ...framings, [index]: { ...current, [axis]: value } })
  }

  const reset = () => {
    setFramings({})
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  const registerLabels = (next: string[]) => {
    setLabels((prev) =>
      prev.length === next.length && prev.every((l, i) => l === next[i])
        ? prev
        : next,
    )
  }

  return (
    <MoveCtx.Provider
      value={{ editing, setEditing, framings, setFraming, reset, labels, registerLabels }}
    >
      {children}
    </MoveCtx.Provider>
  )
}

/**
 * Framing for one picture. Falls back to whatever the page itself sets,
 * which is what the live site always uses.
 */
export function useMoveFraming(index: number, fallback: Framing) {
  const { framings } = useContext(MoveCtx)
  if (!CAN_EDIT) return fallback
  return framings[index] ?? fallback
}

/** Tells the panel what the three pictures are called. */
export function useRegisterMoves(labels: string[]) {
  const { registerLabels } = useContext(MoveCtx)
  const key = labels.join('|')
  useEffect(() => {
    if (CAN_EDIT) registerLabels(labels)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}

export function MoveFramerPanel() {
  const { editing, setEditing, framings, setFraming, reset, labels } =
    useContext(MoveCtx)
  const [copied, setCopied] = useState(false)

  if (!CAN_EDIT) return null

  const copy = async () => {
    // Written in the shape the page expects, so it can be pasted straight
    // over the x and y on each move.
    const lines = labels.map((label, i) => {
      const f = framings[i] ?? { x: 50, y: 50 }
      return `  // ${label}\n  x: ${f.x},\n  y: ${f.y},`
    })
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setEditing(!editing)}
      >
        {editing ? 'Done framing' : 'Frame pictures'}
      </button>

      {editing && (
        <div className={styles.panel}>
          <p className={styles.hint}>
            Slide each picture inside its strip to choose the part that shows.
          </p>

          {labels.map((label, i) => {
            const f = framings[i] ?? { x: 50, y: 50 }
            return (
              <div key={label}>
                <p className={styles.rowLabel}>{label}</p>
                <label className={styles.row}>
                  <span className={styles.rowLabel}>Left / right</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={f.x}
                    onChange={(e) => setFraming(i, 'x', Number(e.target.value))}
                  />
                </label>
                <label className={styles.row}>
                  <span className={styles.rowLabel}>Up / down</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={f.y}
                    onChange={(e) => setFraming(i, 'y', Number(e.target.value))}
                  />
                </label>
              </div>
            )
          })}

          <p className={styles.note}>
            Saved in this browser only. Copy the framing and paste it into the
            page so everyone sees it.
          </p>

          <div className={styles.footer}>
            <button type="button" className={styles.smallBtn} onClick={copy}>
              {copied ? 'Copied!' : 'Copy framing'}
            </button>
            <button type="button" className={styles.smallBtn} onClick={reset}>
              Reset all
            </button>
          </div>
        </div>
      )}
    </>
  )
}
