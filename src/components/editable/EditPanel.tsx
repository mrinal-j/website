import { useEffect, useState } from 'react'
import { SCHEMA, useEditableContext } from './Editable'
import styles from './EditPanel.module.css'

/**
 * Dev-only floating panel. Lists every editable element on the page and shows
 * sliders for the one you pick. Never rendered in production.
 */
export function EditPanel() {
  const { items, store, setValue, reset } = useEditableContext()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)

  // Default to the first registered element.
  useEffect(() => {
    if (!selectedId && items.length) setSelectedId(items[0].id)
  }, [items, selectedId])

  const item = items.find(i => i.id === selectedId)
  if (!item) return null

  const vals = store[item.id] ?? item.defaults
  const sliders = SCHEMA[item.type]

  // Collapsed: just a small pill in the corner that brings the panel back.
  if (collapsed) {
    return (
      <button
        type="button"
        className={styles.reopen}
        onClick={() => setCollapsed(false)}
      >
        Size controls
      </button>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Size controls (only you see this)</span>
        <button
          type="button"
          className={styles.collapse}
          onClick={() => setCollapsed(true)}
          aria-label="Hide size controls"
        >
          ✕
        </button>
      </div>

      <label className={styles.picker}>
        <span>Editing</span>
        <select
          value={item.id}
          onChange={e => setSelectedId(e.target.value)}
        >
          {items.map(i => (
            <option key={i.id} value={i.id}>
              {i.label}
            </option>
          ))}
        </select>
      </label>

      {sliders.map(s => (
        <label key={s.key} className={styles.control}>
          <span>{s.label}</span>
          <input
            type="range"
            min={s.min}
            max={s.max}
            value={vals[s.key]}
            onChange={e => setValue(item.id, s.key, Number(e.target.value))}
          />
          <b>
            {vals[s.key]}
            {s.unit}
          </b>
        </label>
      ))}

      <button
        type="button"
        className={styles.reset}
        onClick={() => reset(item.id)}
      >
        Reset to default
      </button>
    </div>
  )
}
