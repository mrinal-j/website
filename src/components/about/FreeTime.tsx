import {
  CAN_EDIT,
  CollageEditPanel,
  CollageProvider,
  usePiece,
  type PieceLayout,
} from './CollageEditor'
import styles from './FreeTime.module.css'

/**
 * "Outside of work" — a tight, centred grid where big phrases and photos
 * share the same rows, magazine-ad style. Every photo is cropped to a
 * uniform 3:4 tile so the rows read as a neat grid; "Outside of work" is
 * part of the grid itself rather than a section header.
 *
 * The journal has no photos yet: it renders as a small open-book
 * placeholder whose right page flips on a loop.
 */

type Piece =
  | { kind: 'word'; text: string; layout?: PieceLayout }
  | { kind: 'img'; src: string; alt: string; layout?: PieceLayout }
  | { kind: 'book'; layout?: PieceLayout }

// The `layout` values are the hand-tuned positions from the layout editor
// ("Copy layout"). Baked here so every visitor sees the tuned arrangement;
// the dev-only editor edits on top of these.
const ROWS: Piece[][] = [
  [
    { kind: 'word', text: 'Outside of work,', layout: { dx: 351, dy: -82, size: 46 } },
    { kind: 'book', layout: { dx: -355, dy: 70 } },
    { kind: 'word', text: 'I doodle,', layout: { dx: -327, dy: -16, size: 46 } },
  ],
  [
    { kind: 'img', src: '/images/about-photo-02.webp', alt: 'A thali lunch', layout: { dx: 8, dy: 40, size: 203 } },
    { kind: 'word', text: 'I feast,', layout: { dx: 54, dy: 39 } },
    { kind: 'img', src: '/images/about-photo-08.webp', alt: 'Dim sum', layout: { dx: 200, dy: -39, size: 234 } },
    { kind: 'img', src: '/images/about-photo-23.webp', alt: 'Ramen and bao', layout: { dx: -310, dy: 584 } },
  ],
  [
    { kind: 'img', src: '/images/about-photo-12.webp', alt: 'Brunch plates', layout: { dx: 300, dy: -280, rot: 90 } },
    { kind: 'img', src: '/images/about-photo-04.webp', alt: 'Burgers and fries', layout: { dx: -183, dy: 385, rot: 90 } },
    { kind: 'img', src: '/images/about-photo-19.webp', alt: 'A sushi bento box', layout: { dx: 179, dy: 411, rot: 90 } },
    { kind: 'word', text: 'I wander,', layout: { dx: -11, dy: 143 } },
  ],
  [
    { kind: 'img', src: '/images/about-photo-01.webp', alt: 'The Himalayas from a plane window', layout: { dx: 138, dy: -227, size: 203 } },
    { kind: 'img', src: '/images/about-photo-10.webp', alt: 'Brooklyn Bridge at dusk', layout: { dx: -59, dy: 682, size: 194 } },
    { kind: 'img', src: '/images/about-photo-22.webp', alt: 'Waves along lakeside cliffs', layout: { dx: -7, dy: 1107, size: 198, rot: 1 } },
    { kind: 'img', src: '/images/about-photo-03.webp', alt: 'A camel in the desert at sunset', layout: { dx: 76, dy: -270, size: 232 } },
    { kind: 'img', src: '/images/about-photo-20.webp', alt: 'An autumn river reflection', layout: { dx: -462, dy: -306, rot: 90 } },
  ],
  [
    { kind: 'img', src: '/images/about-photo-13.webp', alt: 'A home-cooked family spread', layout: { dx: -137, dy: 72 } },
    { kind: 'word', text: 'I cook,', layout: { dx: 31, dy: -219, size: 46 } },
    { kind: 'img', src: '/images/about-photo-14.webp', alt: 'A dosa on a steel plate', layout: { dx: 121, dy: 74 } },
  ],
  [
    { kind: 'img', src: '/images/about-photo-05.webp', alt: 'A dog on the beach', layout: { dx: 405, dy: 99, rot: 90 } },
    { kind: 'word', text: 'and mostly, I dilly dally.', layout: { dx: 156, dy: -186, size: 46 } },
    { kind: 'img', src: '/images/about-photo-21.webp', alt: 'Red barns seen from a car window', layout: { dx: -360, dy: -227, rot: 90, size: 241 } },
  ],
  [{ kind: 'word', text: '...and I call it research.', layout: { dx: 135, dy: -183 } }],
]

/**
 * The doodle journal: 11 photographed frames of the real notebook (flat
 * spreads plus mid-flip shots) shown one after another on a loop, like
 * stop motion. Frames are bottom-anchored so the book stays put while the
 * turning page rises into the space above it.
 */
const JOURNAL_FRAMES = Array.from(
  { length: 11 },
  (_, i) => `/images/journal-${String(i + 1).padStart(2, '0')}.webp`,
)

function JournalBook({ layout }: { layout?: PieceLayout }) {
  const { style, editProps } = usePiece('book', 'Journal book', 'book', layout)
  return (
    <div
      className={styles.book}
      role="img"
      aria-label="My doodle journal, flipping through pages of hand-drawn patterns"
      style={style}
      {...editProps}
    >
      {JOURNAL_FRAMES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={styles.bookFrame}
          style={{ animationDelay: `${i * 0.4}s` }}
          loading="lazy"
          draggable={false}
        />
      ))}
    </div>
  )
}

function Word({ text, layout }: { text: string; layout?: PieceLayout }) {
  const { style, editProps } = usePiece(`word:${text}`, `"${text}"`, 'word', layout)
  return (
    <span className={styles.collageWord} style={style} {...editProps}>
      {text}
    </span>
  )
}

function Tile({
  src,
  alt,
  layout,
}: {
  src: string
  alt: string
  layout?: PieceLayout
}) {
  const { style, editProps } = usePiece(`img:${src}`, alt, 'img', layout)
  return (
    <img
      src={src}
      alt={alt}
      className={styles.tile}
      loading="lazy"
      style={style}
      {...editProps}
    />
  )
}

export function FreeTime() {
  return (
    <CollageProvider>
      <section className={styles.section}>
        <h2 className="visually-hidden">Outside of work</h2>

        <div className={styles.collage}>
          {ROWS.map((row, ri) => (
            <div key={ri} className={styles.collageRow}>
              {row.map((piece, pi) => {
                if (piece.kind === 'word') {
                  return <Word key={pi} text={piece.text} layout={piece.layout} />
                }
                if (piece.kind === 'book') {
                  return <JournalBook key={pi} layout={piece.layout} />
                }
                return (
                  <Tile
                    key={pi}
                    src={piece.src}
                    alt={piece.alt}
                    layout={piece.layout}
                  />
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
