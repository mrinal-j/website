import {
  CAN_EDIT,
  CollageEditPanel,
  CollageProvider,
  usePiece,
  type PieceLayout,
} from './CollageEditor'
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
 * it covers.
 */

interface Img {
  src: string
  alt: string
  layout?: PieceLayout
}

type Block =
  | { kind: 'text'; text: string; col: number; span: number; layout?: PieceLayout }
  | { kind: 'img'; img: Img; col: number }
  | { kind: 'strip'; imgs: Img[]; col: number }
  | { kind: 'book'; col: number; span: number; layout?: PieceLayout }

const ROWS: Block[][] = [
  [
    { kind: 'text', text: 'Outside of work,', col: 1, span: 2 },
    { kind: 'book', col: 4, span: 2 },
    { kind: 'text', text: 'I doodle,', col: 7, span: 2 },
  ],
  [
    { kind: 'img', img: { src: '/images/about-photo-02.webp', alt: 'A thali lunch' }, col: 1 },
    { kind: 'text', text: 'I feast,', col: 3, span: 2 },
    {
      kind: 'strip',
      col: 5,
      imgs: [
        { src: '/images/about-photo-08.webp', alt: 'Dim sum' },
        { src: '/images/about-photo-23.webp', alt: 'Ramen and bao' },
      ],
    },
    { kind: 'img', img: { src: '/images/about-photo-12.webp', alt: 'Brunch plates' }, col: 8 },
  ],
  [
    {
      kind: 'strip',
      col: 1,
      imgs: [
        { src: '/images/about-photo-19.webp', alt: 'A sushi bento box' },
        { src: '/images/about-photo-04.webp', alt: 'Burgers and fries' },
      ],
    },
    { kind: 'text', text: 'I wander,', col: 4, span: 2 },
    { kind: 'img', img: { src: '/images/about-photo-01.webp', alt: 'The Himalayas from a plane window' }, col: 6 },
    { kind: 'img', img: { src: '/images/about-photo-10.webp', alt: 'Brooklyn Bridge at dusk' }, col: 8 },
  ],
  [
    { kind: 'img', img: { src: '/images/about-photo-22.webp', alt: 'Waves along lakeside cliffs' }, col: 1 },
    {
      kind: 'strip',
      col: 3,
      imgs: [
        { src: '/images/about-photo-03.webp', alt: 'A camel in the desert at sunset' },
        { src: '/images/about-photo-20.webp', alt: 'An autumn river reflection' },
      ],
    },
    { kind: 'text', text: 'I cook,', col: 6, span: 2 },
    { kind: 'img', img: { src: '/images/about-photo-13.webp', alt: 'A home-cooked family spread' }, col: 8 },
  ],
  [
    { kind: 'img', img: { src: '/images/about-photo-14.webp', alt: 'A dosa on a steel plate' }, col: 1 },
    { kind: 'text', text: 'and mostly, I dilly dally.', col: 3, span: 2 },
    {
      kind: 'strip',
      col: 6,
      imgs: [
        { src: '/images/about-photo-05.webp', alt: 'A dog on the beach' },
        { src: '/images/about-photo-21.webp', alt: 'Red barns seen from a car window' },
      ],
    },
  ],
  [{ kind: 'text', text: '...and I call it research.', col: 4, span: 2 }],
]

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

function Note({ text, layout }: { text: string; layout?: PieceLayout }) {
  const { style, editProps } = usePiece(`word:${text}`, `"${text}"`, 'word', layout)
  return (
    <span className={styles.note} style={style} {...editProps}>
      {text}
    </span>
  )
}

function Square({ img }: { img: Img }) {
  const { style, editProps } = usePiece(`img:${img.src}`, img.alt, 'img', img.layout)
  return (
    <img
      src={img.src}
      alt={img.alt}
      className={styles.square}
      loading="lazy"
      style={style}
      {...editProps}
    />
  )
}

/** Places one block into its columns. */
function Cell({
  block,
  children,
  className,
}: {
  block: Block
  children: React.ReactNode
  className: string
}) {
  const span = block.kind === 'img' ? 1 : block.kind === 'strip' ? 2 : block.span
  return (
    <div
      className={className}
      style={{ gridColumn: `${block.col} / span ${span}` }}
    >
      {children}
    </div>
  )
}

export function FreeTime() {
  return (
    <CollageProvider>
      <section className={styles.section}>
        <h2 className="visually-hidden">Outside of work</h2>

        <div className={styles.collage}>
          {ROWS.map((row, ri) => (
            <div key={ri} className={styles.row}>
              {row.map((block, bi) => {
                if (block.kind === 'text') {
                  return (
                    <Cell key={bi} block={block} className={styles.cellText}>
                      <Note text={block.text} layout={block.layout} />
                    </Cell>
                  )
                }
                if (block.kind === 'book') {
                  return (
                    <Cell key={bi} block={block} className={styles.cellBook}>
                      <JournalBook layout={block.layout} />
                    </Cell>
                  )
                }
                if (block.kind === 'strip') {
                  return (
                    <Cell key={bi} block={block} className={styles.cellStrip}>
                      {block.imgs.map(img => (
                        <Square key={img.src} img={img} />
                      ))}
                    </Cell>
                  )
                }
                return (
                  <Cell key={bi} block={block} className={styles.cellImg}>
                    <Square img={block.img} />
                  </Cell>
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
