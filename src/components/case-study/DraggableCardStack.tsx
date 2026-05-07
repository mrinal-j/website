import { useRef, useState, useCallback } from 'react'
import styles from './DraggableCardStack.module.css'

interface Card {
  text: string
  tone: 'yellow' | 'indigo'
}

interface Props {
  cards: Card[]
}

export function DraggableCardStack({ cards }: Props) {
  // Track which cards have been flung away (by index)
  const [flung, setFlung] = useState<Set<number>>(new Set())
  // Track the card currently being dragged
  const [dragging, setDragging] = useState<number | null>(null)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const startPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // The "active" stack = cards not yet flung, in original order
  const activeCards = cards
    .map((card, i) => ({ card, i }))
    .filter(({ i }) => !flung.has(i))

  const topIndex = activeCards.length > 0 ? activeCards[activeCards.length - 1].i : -1

  const handlePointerDown = useCallback(
    (cardIdx: number, e: React.PointerEvent) => {
      if (cardIdx !== topIndex) return
      e.preventDefault()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      setDragging(cardIdx)
      startPos.current = { x: e.clientX, y: e.clientY }
      setDragPos({ x: 0, y: 0 })
    },
    [topIndex],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging === null) return
      setDragPos({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      })
    },
    [dragging],
  )

  const handlePointerUp = useCallback(() => {
    if (dragging === null) return
    const dist = Math.sqrt(dragPos.x ** 2 + dragPos.y ** 2)
    if (dist > 80) {
      // Fling the card away
      setFlung((prev) => new Set(prev).add(dragging))
    }
    setDragging(null)
    setDragPos({ x: 0, y: 0 })
  }, [dragging, dragPos])

  const resetStack = () => {
    setFlung(new Set())
    setDragging(null)
    setDragPos({ x: 0, y: 0 })
  }

  // Show up to 4 cards in the visible stack (the rest are hidden beneath)
  const visibleCount = Math.min(activeCards.length, 4)
  const visibleCards = activeCards.slice(-visibleCount)

  return (
    <div className={styles.wrapper}>
      <div
        ref={containerRef}
        className={styles.stack}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {visibleCards.map(({ card, i }, stackPos) => {
          const isTop = i === topIndex
          const depth = visibleCount - 1 - stackPos // 0 = top
          const offsetY = depth * 6
          const offsetX = depth * 3
          const rotate = depth * 1.2

          const isDragging = dragging === i
          const style: React.CSSProperties = {
            zIndex: stackPos + 1,
            transform: isDragging
              ? `translate(${dragPos.x}px, ${dragPos.y}px) rotate(${dragPos.x * 0.08}deg)`
              : `translateY(${offsetY}px) translateX(${offsetX}px) rotate(${rotate}deg)`,
            transition: isDragging ? 'none' : 'transform 0.35s ease',
            cursor: isTop ? 'grab' : 'default',
            opacity: isDragging ? 0.9 : 1,
          }

          return (
            <div
              key={i}
              className={`${styles.card} ${styles[card.tone]}`}
              style={style}
              onPointerDown={(e) => handlePointerDown(i, e)}
            >
              <p className={styles.cardText}>{card.text}</p>
            </div>
          )
        })}

        {activeCards.length === 0 && (
          <button className={styles.resetBtn} onClick={resetStack}>
            View again
          </button>
        )}
      </div>

      <p className={styles.hint}>
        <span className={styles.hintIcon}>👋</span> Drag around
      </p>
    </div>
  )
}
