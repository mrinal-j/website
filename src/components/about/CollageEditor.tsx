import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import styles from './CollageEditor.module.css'

/**
 * Dev-only layout editor for the About collage.
 *
 * When the site runs locally, an "Edit layout" button appears. Turn it on,
 * then click any photo, word, or the journal book: drag to move it, and use
 * the panel to resize it. Changes are saved in this browser only. "Copy
 * layout" puts all the numbers on the clipboard so they can be baked into
 * the code as the layout everyone sees.
 */

export const CAN_EDIT = import.meta.env.DEV

export type PieceKind = 'img' | 'word' | 'book'

/** Position/size values for one piece. Baked defaults live in the collage
 *  data; anything edited in the browser overrides them key by key. */
export interface PieceLayout {
  dx?: number
  dy?: number
  size?: number
  rot?: number
}

type Override = PieceLayout
type Store = Record<string, Override>
type Meta = Record<string, { label: string; kind: PieceKind; defaults: PieceLayout }>

// Bumped when the collage is rearranged, so stale saved offsets from an
// older arrangement don't get applied to the new one.
const STORAGE_KEY = 'aboutCollageLayout-v2'

/** min, max, and starting value for each kind's size control */
const SIZE_RANGE: Record<PieceKind, [number, number, number]> = {
  img: [80, 420, 160],
  word: [11, 40, 16],
  book: [120, 600, 280],
}

function loadStore(): Store {
  if (!CAN_EDIT || typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Store) : {}
  } catch {
    return {}
  }
}

interface Ctx {
  editing: boolean
  setEditing: (on: boolean) => void
  selected: string | null
  setSelected: (id: string | null) => void
  store: Store
  update: (id: string, patch: Override) => void
  resetPiece: (id: string) => void
  resetAll: () => void
  meta: Meta
  registerMeta: (
    id: string,
    label: string,
    kind: PieceKind,
    defaults: PieceLayout,
  ) => void
}

const noop = () => {}
const CollageCtx = createContext<Ctx>({
  editing: false,
  setEditing: noop,
  selected: null,
  setSelected: noop,
  store: {},
  update: noop,
  resetPiece: noop,
  resetAll: noop,
  meta: {},
  registerMeta: noop,
})

export function CollageProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [store, setStore] = useState<Store>(loadStore)
  const [meta, setMeta] = useState<Meta>({})

  useEffect(() => {
    if (!CAN_EDIT || typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    } catch {
      /* ignore */
    }
  }, [store])

  const update = (id: string, patch: Override) =>
    setStore(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))

  const resetPiece = (id: string) =>
    setStore(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })

  const resetAll = () => setStore({})

  const registerMeta = (
    id: string,
    label: string,
    kind: PieceKind,
    defaults: PieceLayout,
  ) =>
    setMeta(prev =>
      prev[id]?.label === label
        ? prev
        : { ...prev, [id]: { label, kind, defaults } },
    )

  return (
    <CollageCtx.Provider
      value={{
        editing,
        setEditing,
        selected,
        setSelected,
        store,
        update,
        resetPiece,
        resetAll,
        meta,
        registerMeta,
      }}
    >
      {children}
    </CollageCtx.Provider>
  )
}

/**
 * Wires one collage piece into the editor. Returns the inline style with any
 * saved position/size applied, plus the props that make it clickable and
 * draggable while edit mode is on.
 */
export function usePiece(
  id: string,
  label: string,
  kind: PieceKind,
  defaults: PieceLayout = {},
) {
  const ctx = useContext(CollageCtx)
  const { editing, selected, store, update, setSelected, registerMeta } = ctx

  useEffect(() => {
    if (CAN_EDIT) registerMeta(id, label, kind, defaults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, label, kind])

  // Browser edits override the baked defaults key by key
  const o = { ...defaults, ...store[id] }
  const style: CSSProperties = {}
  if (o.dx || o.dy || o.rot) {
    style.transform = `translate(${o.dx ?? 0}px, ${o.dy ?? 0}px) rotate(${o.rot ?? 0}deg)`
  }
  if (o.size != null) {
    if (kind === 'word') style.fontSize = o.size
    else style.width = o.size
  }

  if (!CAN_EDIT || !editing) return { style, editProps: {} }

  const onPointerDown = (e: ReactPointerEvent) => {
    e.preventDefault()
    setSelected(id)
    const startX = e.clientX
    const startY = e.clientY
    const baseX = o.dx ?? 0
    const baseY = o.dy ?? 0
    const move = (ev: PointerEvent) =>
      update(id, {
        dx: Math.round(baseX + ev.clientX - startX),
        dy: Math.round(baseY + ev.clientY - startY),
      })
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return {
    style,
    editProps: {
      onPointerDown,
      draggable: false,
      'data-editable': true,
      'data-selected': selected === id || undefined,
    },
  }
}

function Row({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
}) {
  return (
    <label className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      <input
        className={styles.number}
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </label>
  )
}

export function CollageEditPanel() {
  const {
    editing,
    setEditing,
    selected,
    setSelected,
    store,
    update,
    resetPiece,
    resetAll,
    meta,
  } = useContext(CollageCtx)
  const [copied, setCopied] = useState(false)

  if (!CAN_EDIT) return null

  const sel = selected ? meta[selected] : null
  const o = sel ? { ...sel.defaults, ...(selected ? store[selected] : {}) } : {}
  const range = sel ? SIZE_RANGE[sel.kind] : SIZE_RANGE.img

  const copyLayout = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(store, null, 2))
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
        onClick={() => {
          setEditing(!editing)
          setSelected(null)
        }}
      >
        {editing ? 'Done editing' : 'Edit layout'}
      </button>

      {editing && (
        <div className={styles.panel}>
          {sel && selected ? (
            <>
              <p className={styles.title}>{sel.label}</p>
              <Row
                label="Size"
                value={o.size ?? range[2]}
                onChange={v => update(selected, { size: v })}
                min={range[0]}
                max={range[1]}
              />
              <Row
                label="Left / right"
                value={o.dx ?? 0}
                onChange={v => update(selected, { dx: v })}
                min={-300}
                max={300}
              />
              <Row
                label="Up / down"
                value={o.dy ?? 0}
                onChange={v => update(selected, { dy: v })}
                min={-300}
                max={300}
              />
              <Row
                label="Rotate"
                value={o.rot ?? 0}
                onChange={v => update(selected, { rot: v })}
                min={-45}
                max={45}
              />
              <button
                type="button"
                className={styles.smallBtn}
                onClick={() => resetPiece(selected)}
              >
                Reset this one
              </button>
            </>
          ) : (
            <p className={styles.hint}>
              Click a photo, a word, or the book to select it, then drag to
              move it or use the sliders.
            </p>
          )}

          <div className={styles.footer}>
            <button type="button" className={styles.smallBtn} onClick={copyLayout}>
              {copied ? 'Copied!' : 'Copy layout'}
            </button>
            <button type="button" className={styles.smallBtn} onClick={resetAll}>
              Reset all
            </button>
          </div>
        </div>
      )}
    </>
  )
}
