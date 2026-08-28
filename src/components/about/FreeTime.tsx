import { useEffect, useRef, useState } from 'react'
import {
  CAN_EDIT,
  CollageEditPanel,
  CollageProvider,
  useRegisterSlots,
  useSlot,
} from './CollageEditor'
import { NowPlaying } from './NowPlaying'
import styles from './FreeTime.module.css'

/**
 * "Outside of work" — a quiet, editorial photo grid.
 *
 * Every row is an 8-column grid with no gaps, so photos placed in adjacent
 * columns butt together into strips and the breathing room comes from the
 * empty cells between them. Small body-text notes sit in those gaps and
 * read top to bottom as one sentence.
 *
 * `col` is the column a block starts in (1-8); `span` is how many columns
 * it covers. Striped tiles stand in for photos not taken yet.
 */

interface Img {
  src: string
  alt: string
  /** Framing inside the square, as percents. 50 is centred on that axis. */
  posX?: number
  posY?: number
}

type Block =
  | { kind: 'text'; text: string; col: number; span: number; align?: 'center' }
  | { kind: 'img'; img: Img; col: number }
  | { kind: 'strip'; imgs: Img[]; col: number }
  | { kind: 'book'; col: number; span: number }
  | { kind: 'player'; col: number; span: number }
  | { kind: 'caption'; col: number; span: number }

const p = (n: string, alt: string, posY?: number, posX?: number): Img => ({
  src: `/images/about-photo-${n}.webp`,
  alt,
  ...(posY == null ? {} : { posY }),
  ...(posX == null ? {} : { posX }),
})

const ROWS: Block[][] = [
  [
    { kind: 'book', col: 1, span: 2 },
    { kind: 'text', text: 'I doodle,', col: 4, span: 2 },
    {
      kind: 'strip',
      col: 7,
      imgs: [
        p('27', 'Painting in the park with a friend', 63),
        p('28', 'Sketching in Central Park', 62),
      ],
    },
  ],
  [
    { kind: 'strip', col: 1, imgs: [p('07', 'Dumplings and fried rice', 74), p('20', 'An autumn river reflection')] },
    {
      kind: 'strip',
      col: 3,
      imgs: [
        p('19', 'A sushi bento box'),
        p('21', 'Red barns seen from a car window', 59),
        p('15', 'Korean barbecue with friends', 41),
      ],
    },
    // column 6 stays empty, so the card has room to breathe
    { kind: 'player', col: 7, span: 2 },
  ],
  [
    { kind: 'strip', col: 1, imgs: [p('11', 'Hot dogs and onion rings'), p('09', 'A snowy mountain drive', 92)] },
    {
      kind: 'text',
      text: 'I feast my way through a New York list that keeps growing,',
      col: 3,
      span: 3,
      align: 'center',
    },
    {
      kind: 'strip',
      col: 6,
      imgs: [
        p('23', 'Ramen and bao'),
        p('18', 'Sunset by the sea', 61),
        p('16', 'A plated dinner out', 23),
      ],
    },
  ],
  [
    {
      kind: 'strip',
      col: 1,
      imgs: [
        p('12', 'Brunch plates'),
        p('10', 'Brooklyn Bridge at dusk'),
        p('02', 'A thali lunch'),
      ],
    },
    { kind: 'text', text: 'I wander,', col: 4, span: 2, align: 'center' },
    {
      kind: 'strip',
      col: 6,
      imgs: [
        p('03', 'A camel in the desert at sunset'),
        p('08', 'Dim sum'),
        p('17', 'A fried platter with plantain'),
      ],
    },
  ],
  [
    { kind: 'img', img: p('22', 'Waves along lakeside cliffs', 70), col: 1 },
    { kind: 'text', text: 'I cook,', col: 2, span: 1, align: 'center' },
    { kind: 'img', img: p('04', 'Burgers and fries'), col: 3 },
    { kind: 'img', img: p('13', 'A home-cooked family spread'), col: 4 },
    { kind: 'img', img: p('26', 'Making rice paper rolls at home'), col: 5 },
    { kind: 'img', img: p('05', 'A dog on the beach'), col: 6 },
    { kind: 'strip', col: 7, imgs: [p('06', 'A Korean spread with banchan'), p('14', 'A dosa on a steel plate')] },
  ],
  [
    {
      kind: 'text',
      text: 'and I am a new plant mom to three.',
      col: 1,
      span: 2,
    },
    { kind: 'img', img: p('25', 'Burrata, bread and a glass of rosé'), col: 6 },
    { kind: 'img', img: p('01', 'The Himalayas from a plane window'), col: 7 },
    { kind: 'img', img: p('24', 'The Circle Line boat passing the skyline at sunset'), col: 8 },
    { kind: 'caption', col: 6, span: 3 },
  ],
]

/* ------------------------------------------------------------
   Content pools.

   ROWS above fixes the grid: which column each box sits in and how wide
   it is. The pools below are the content that fills those boxes, in the
   order they first appear. The editor only reorders these pools, so the
   grid itself can never shift.
   ------------------------------------------------------------ */

const PHOTO_POOL: Img[] = []
const TEXT_POOL: string[] = []

for (const row of ROWS) {
  for (const block of row) {
    if (block.kind === 'text') TEXT_POOL.push(block.text)
    if (block.kind === 'img') PHOTO_POOL.push(block.img)
    if (block.kind === 'strip') PHOTO_POOL.push(...block.imgs)
  }
}

/* ------------------------------------------------------------
   The doodle journal.

   Sixteen scanned pattern pages become eight leaves, each with a doodle
   on the front and another on the back. Leaves turn one at a time, then
   the book leafs back the other way, so the loop never snaps.
   ------------------------------------------------------------ */

const DOODLES = Array.from(
  { length: 16 },
  (_, i) => `/images/doodle-${String(i + 1).padStart(2, '0')}.webp`,
)
/** Two doodles per leaf: one each side. */
const LEAVES = DOODLES.length / 2
const TURN_MS = 1700

function JournalBook() {
  const [turned, setTurned] = useState(0)
  // The leaf mid-turn is held on top, so it never pops behind its
  // neighbours halfway through the rotation.
  const [moving, setMoving] = useState<number | null>(null)
  const direction = useRef(1)
  const turnedRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let settle: ReturnType<typeof setTimeout>
    const id = setInterval(() => {
      let step = direction.current
      let next = turnedRef.current + step
      if (next > LEAVES || next < 0) {
        direction.current = -step
        step = -step
        next = turnedRef.current + step
      }
      // Turning forward moves the topmost unturned leaf; turning back
      // moves the one that lands face up again.
      const leaf = step > 0 ? turnedRef.current : next
      turnedRef.current = next

      setMoving(leaf)
      setTurned(next)
      clearTimeout(settle)
      settle = setTimeout(() => setMoving(null), TURN_MS - 300)
    }, TURN_MS)

    return () => {
      clearInterval(id)
      clearTimeout(settle)
    }
  }, [])

  return (
    <div
      className={styles.book}
      role="img"
      aria-label="My doodle journal, turning through pages of hand-drawn patterns"
    >
      <span className={styles.bookPageLeft} />
      <span className={styles.bookPageRight} />

      {Array.from({ length: LEAVES }, (_, k) => {
        const isTurned = k < turned
        const isMoving = k === moving
        return (
          <div
            key={k}
            className={`${styles.leaf} ${isTurned ? styles.leafTurned : ''} ${
              isMoving ? styles.leafMoving : ''
            }`}
            // At rest, unturned leaves stack with the next one on top and
            // turned leaves pile up the other way. The leaf in motion sits
            // above both piles for the whole sweep.
            style={{ zIndex: isMoving ? LEAVES + 1 : isTurned ? k : LEAVES - k }}
          >
            <span className={styles.leafFront}>
              <img src={DOODLES[k * 2]} alt="" loading="lazy" draggable={false} />
            </span>
            <span className={styles.leafBack}>
              <img src={DOODLES[k * 2 + 1]} alt="" loading="lazy" draggable={false} />
            </span>
          </div>
        )
      })}

      <span className={styles.bookSpine} />
    </div>
  )
}

/** One text box. `slot` is its fixed place in the grid. */
function Note({ slot }: { slot: number }) {
  const { content, slotProps } = useSlot('text', slot)
  return (
    <span className={styles.note} {...slotProps}>
      {TEXT_POOL[content]}
    </span>
  )
}

/** One square box: a photo, or a striped tile where a photo is still to come. */
function Square({ slot }: { slot: number }) {
  const { content, framing, slotProps } = useSlot('photo', slot)
  const img = PHOTO_POOL[content]
  // Live edits win, then anything baked in, then centred
  const x = framing?.x ?? img.posX ?? 50
  const y = framing?.y ?? img.posY ?? 50
  return (
    <img
      src={img.src}
      alt={img.alt}
      className={styles.square}
      style={
        x === 50 && y === 50
          ? undefined
          : { objectPosition: `${x}% ${y}%` }
      }
      loading="lazy"
      {...slotProps}
    />
  )
}

/** How many columns a block covers. */
function spanOf(block: Block) {
  if (block.kind === 'img') return 1
  if (block.kind === 'strip') return block.imgs.length
  return block.span
}

export function FreeTime() {
  // Slot counters: each box gets a fixed number in grid order, so the editor
  // always knows which place it is swapping.
  let photoSlot = 0
  let textSlot = 0

  return (
    <CollageProvider>
      <SlotCounts />
      <section className={styles.section}>
        <h2 className={styles.heading}>Outside of work&hellip;</h2>

        <div className={styles.collage}>
          {ROWS.map((row, ri) => (
            <div key={ri} className={styles.row}>
              {row.map((block, bi) => {
                const style = { gridColumn: `${block.col} / span ${spanOf(block)}` }

                if (block.kind === 'text') {
                  const slot = textSlot++
                  return (
                    <div
                      key={bi}
                      className={`${styles.cellText} ${
                        block.align === 'center' ? styles.cellTextCentre : ''
                      }`}
                      style={style}
                    >
                      <Note slot={slot} />
                    </div>
                  )
                }
                if (block.kind === 'book') {
                  return (
                    <div key={bi} className={styles.cellBook} style={style}>
                      <JournalBook />
                    </div>
                  )
                }
                if (block.kind === 'player') {
                  return (
                    <div key={bi} className={styles.cellPlayer} style={style}>
                      <NowPlaying height={184} />
                    </div>
                  )
                }
                if (block.kind === 'strip') {
                  const slots = block.imgs.map(() => photoSlot++)
                  return (
                    <div key={bi} className={styles.cellStrip} style={style}>
                      {slots.map(slot => (
                        <Square key={slot} slot={slot} />
                      ))}
                    </div>
                  )
                }
                if (block.kind === 'caption') {
                  return (
                    <p key={bi} className={styles.vsco} style={style}>
                      the photos that did not make it are on{' '}
                      <a
                        href="https://vsco.co/mrinaljadhav/gallery"
                        target="_blank"
                        rel="noopener"
                      >
                        VSCO
                      </a>
                      .
                    </p>
                  )
                }
                const slot = photoSlot++
                return (
                  <div key={bi} className={styles.cellImg} style={style}>
                    <Square slot={slot} />
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {CAN_EDIT && <CollageEditPanel />}
      </section>
    </CollageProvider>
  )
}

/** Registers how many swappable boxes of each kind the grid has. */
function SlotCounts() {
  useRegisterSlots('photo', PHOTO_POOL.length)
  useRegisterSlots('text', TEXT_POOL.length)
  return null
}
