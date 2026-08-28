import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import styles from './CollageEditor.module.css'

/**
 * Dev-only swap editor for the About collage.
 *
 * The grid itself is fixed: every box keeps its column, its span and its
 * size. All this does is swap which piece of content sits in which box, so
 * the layout can never end up broken. Click one photo, then another, and
 * the two trade places. Text notes swap with other text notes the same way.
 *
 * Changes are saved in this browser only. "Copy layout" puts the order on
 * the clipboard so it can be baked into the code for everyone.
 */

export const CAN_EDIT = import.meta.env.DEV

/** Only pieces of the same kind can trade places, so nothing resizes. */
export type SwapKind = 'photo' | 'text'

type Order = Record<SwapKind, number[]>
type Selection = { kind: SwapKind; slot: number } | null

// Bumped whenever an order is baked into the code, so a stale saved
// order in someone's browser is discarded rather than reapplied.
const STORAGE_KEY = 'aboutCollageOrder-v2'

interface Ctx {
  editing: boolean
  setEditing: (on: boolean) => void
  order: Order
  contentFor: (kind: SwapKind, slot: number) => number
  selected: Selection
  pick: (kind: SwapKind, slot: number) => void
  reset: () => void
  register: (kind: SwapKind, count: number) => void
}

const noop = () => {}
const CollageCtx = createContext<Ctx>({
  editing: false,
  setEditing: noop,
  order: { photo: [], text: [] },
  contentFor: (_k, slot) => slot,
  selected: null,
  pick: noop,
  reset: noop,
  register: noop,
})

function loadOrder(): Partial<Order> {
  if (!CAN_EDIT || typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Partial<Order>) : {}
  } catch {
    return {}
  }
}

export function CollageProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false)
  const [selected, setSelected] = useState<Selection>(null)
  const [order, setOrder] = useState<Order>(() => {
    const saved = loadOrder()
    return { photo: saved.photo ?? [], text: saved.text ?? [] }
  })

  useEffect(() => {
    if (!CAN_EDIT || typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
    } catch {
      /* ignore */
    }
  }, [order])

  /** Grows the order list to match however many boxes of that kind exist. */
  const register = (kind: SwapKind, count: number) =>
    setOrder(prev => {
      const cur = prev[kind]
      if (cur.length === count) return prev
      const next = Array.from({ length: count }, (_, i) =>
        cur[i] != null && cur[i] < count ? cur[i] : i,
      )
      // Any duplicates from an out-of-date saved order fall back to identity
      const seen = new Set<number>()
      const clean = next.map((v, i) => {
        if (seen.has(v)) return i
        seen.add(v)
        return v
      })
      return { ...prev, [kind]: clean }
    })

  const contentFor = (kind: SwapKind, slot: number) => {
    const v = order[kind][slot]
    return v == null ? slot : v
  }

  const pick = (kind: SwapKind, slot: number) => {
    if (!selected) {
      setSelected({ kind, slot })
      return
    }
    if (selected.kind !== kind) {
      // Different kinds can't trade places; start again from the new pick
      setSelected({ kind, slot })
      return
    }
    if (selected.slot === slot) {
      setSelected(null)
      return
    }
    setOrder(prev => {
      const list = [...prev[kind]]
      const a = selected.slot
      const b = slot
      ;[list[a], list[b]] = [list[b], list[a]]
      return { ...prev, [kind]: list }
    })
    setSelected(null)
  }

  const reset = () => {
    setOrder(prev => ({
      photo: prev.photo.map((_, i) => i),
      text: prev.text.map((_, i) => i),
    }))
    setSelected(null)
  }

  return (
    <CollageCtx.Provider
      value={{ editing, setEditing, order, contentFor, selected, pick, reset, register }}
    >
      {children}
    </CollageCtx.Provider>
  )
}

/** Tells the editor how many boxes of a kind exist. */
export function useRegisterSlots(kind: SwapKind, count: number) {
  const { register } = useContext(CollageCtx)
  useEffect(() => {
    if (CAN_EDIT) register(kind, count)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, count])
}

/**
 * Wires one box into the editor. Returns which content it should show and
 * the props that make it clickable while edit mode is on.
 */
export function useSlot(kind: SwapKind, slot: number) {
  const { editing, contentFor, selected, pick } = useContext(CollageCtx)
  const content = contentFor(kind, slot)

  if (!CAN_EDIT || !editing) return { content, slotProps: {} }

  return {
    content,
    slotProps: {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        pick(kind, slot)
      },
      'data-swappable': true,
      'data-picked':
        selected && selected.kind === kind && selected.slot === slot
          ? true
          : undefined,
    },
  }
}

export function CollageEditPanel() {
  const { editing, setEditing, order, selected, reset } = useContext(CollageCtx)
  const [copied, setCopied] = useState(false)

  if (!CAN_EDIT) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(order, null, 2))
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
        {editing ? 'Done editing' : 'Rearrange'}
      </button>

      {editing && (
        <div className={styles.panel}>
          <p className={styles.hint}>
            {selected
              ? `Now click another ${selected.kind === 'photo' ? 'photo' : 'line of text'} to swap the two.`
              : 'Click a photo to pick it up, then click another photo to swap them. Text swaps with text the same way.'}
          </p>
          <p className={styles.note}>
            Boxes keep their size and position, so the grid stays as it is.
          </p>

          <div className={styles.footer}>
            <button type="button" className={styles.smallBtn} onClick={copy}>
              {copied ? 'Copied!' : 'Copy layout'}
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
