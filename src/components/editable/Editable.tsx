import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

/**
 * A tiny reusable system for live-resizing images and text boxes.
 *
 * Wrap a page in <EditableProvider>, then use <EditableImage> / <EditableText>
 * for any element you want to be adjustable. Drop one <EditPanel> (dev-only)
 * anywhere inside the provider and it lists every editable element with
 * sliders. Chosen sizes are saved in the browser and used as-is in production.
 */

export type EditableType = 'image' | 'text'
export type Values = Record<string, number>

export interface SliderDef {
  key: string
  label: string
  min: number
  max: number
  unit: string
}

/** Which sliders show up for each kind of element. */
export const SCHEMA: Record<EditableType, SliderDef[]> = {
  image: [
    { key: 'width', label: 'Frame width', min: 80, max: 600, unit: 'px' },
    { key: 'height', label: 'Frame height', min: 80, max: 700, unit: 'px' },
    { key: 'radius', label: 'Frame roundness', min: 0, max: 60, unit: 'px' },
    { key: 'posX', label: 'Move photo ←→', min: 0, max: 100, unit: '%' },
    { key: 'posY', label: 'Move photo ↑↓', min: 0, max: 100, unit: '%' },
  ],
  text: [
    { key: 'fontSize', label: 'Text size', min: 10, max: 40, unit: 'px' },
    { key: 'width', label: 'Text box width', min: 120, max: 760, unit: 'px' },
    { key: 'height', label: 'Text box height', min: 20, max: 400, unit: 'px' },
  ],
}

interface Item {
  id: string
  type: EditableType
  label: string
  defaults: Values
}

interface EditableCtx {
  items: Item[]
  store: Record<string, Values>
  register: (item: Item) => void
  unregister: (id: string) => void
  setValue: (id: string, key: string, value: number) => void
  reset: (id: string) => void
}

const STORAGE_KEY = 'editableSizing'

function loadStore(): Record<string, Values> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const noop = () => {}
const EditableContext = createContext<EditableCtx>({
  items: [],
  store: {},
  register: noop,
  unregister: noop,
  setValue: noop,
  reset: noop,
})

export function useEditableContext() {
  return useContext(EditableContext)
}

export function EditableProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([])
  const [store, setStore] = useState<Record<string, Values>>(loadStore)

  // Save to the browser whenever anything changes.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    } catch {
      /* ignore */
    }
  }, [store])

  const register = useCallback((item: Item) => {
    setItems(prev =>
      prev.some(i => i.id === item.id) ? prev : [...prev, item],
    )
    // Keep saved values, but fill in any missing keys from defaults.
    setStore(prev => ({
      ...prev,
      [item.id]: { ...item.defaults, ...prev[item.id] },
    }))
  }, [])

  const unregister = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const setValue = useCallback((id: string, key: string, value: number) => {
    setStore(prev => ({ ...prev, [id]: { ...prev[id], [key]: value } }))
  }, [])

  const reset = useCallback((id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id)
      if (item) setStore(prev => ({ ...prev, [id]: { ...item.defaults } }))
      return prevItems
    })
  }, [])

  return (
    <EditableContext.Provider
      value={{ items, store, register, unregister, setValue, reset }}
    >
      {children}
    </EditableContext.Provider>
  )
}

/** Returns the current values for one element and registers it with the panel. */
function useEditable(config: {
  id: string
  type: EditableType
  label: string
  defaults: Values
}): Values {
  const { register, unregister, store } = useEditableContext()
  const { id, type, label } = config

  useEffect(() => {
    register({ id, type, label, defaults: config.defaults })
    return () => unregister(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return { ...config.defaults, ...store[id] }
}

interface EditableImageProps {
  id: string
  label: string
  src: string
  alt: string
  defaults: Values
  className?: string
}

export function EditableImage({
  id,
  label,
  src,
  alt,
  defaults,
  className,
}: EditableImageProps) {
  const v = useEditable({ id, type: 'image', label, defaults })
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      style={{
        width: v.width,
        height: v.height,
        maxWidth: 'none',
        borderRadius: v.radius,
        objectFit: 'cover',
        objectPosition: `${v.posX}% ${v.posY}%`,
      }}
    />
  )
}

interface EditableTextProps {
  id: string
  label: string
  defaults: Values
  className?: string
  children: ReactNode
}

export function EditableText({
  id,
  label,
  defaults,
  className,
  children,
}: EditableTextProps) {
  const v = useEditable({ id, type: 'text', label, defaults })
  return (
    <div
      className={className}
      style={{ fontSize: v.fontSize, width: v.width, maxWidth: '100%', height: v.height }}
    >
      {children}
    </div>
  )
}
