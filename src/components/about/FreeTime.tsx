import {
  CAN_EDIT,
  CollageEditPanel,
  CollageProvider,
  usePiece,
  type PieceLayout,
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
  layout?: PieceLayout
}

type Block =
  | {
      kind: 'text'
      text: string
      col: number
      span: number
      align?: 'center'
      layout?: PieceLayout
    }
  | { kind: 'img'; img: Img; col: number }
  | { kind: 'strip'; imgs: Img[]; col: number }
  | { kind: 'phStrip'; count: number; col: number; label: string }
  | { kind: 'book'; col: number; span: number; layout?: PieceLayout }
  | { kind: 'player'; col: number; span: number }

const p = (n: string, alt: string): Img => ({
  src: `/images/about-photo-${n}.webp`,
  alt,
})

const ROWS: Block[][] = [
  [
    { kind: 'text', text: 'Outside of work,', col: 1, span: 2 },
    { kind: 'book', col: 4, span: 2 },
    { kind: 'text', text: 'I doodle,', col: 7, span: 2 },
  ],
  [
    { kind: 'player', col: 1, span: 2 },
    // column 3 is left empty, so the player has room to breathe
    { kind: 'strip', col: 4, imgs: [p('06', 'A Korean spread with banchan'), p('07', 'Dumplings and fried rice')] },
    {
      kind: 'strip',
      col: 6,
      imgs: [
        p('11', 'Hot dogs and onion rings'),
        p('15', 'Korean barbecue with friends'),
        p('16', 'A plated dinner out'),
      ],
    },
  ],
  [
    { kind: 'strip', col: 1, imgs: [p('02', 'A thali lunch'), p('12', 'Brunch plates')] },
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
        p('08', 'Dim sum'),
        p('23', 'Ramen and bao'),
        p('17', 'A fried platter with plantain'),
      ],
    },
  ],
  [
    {
      kind: 'strip',
      col: 1,
      imgs: [
        p('04', 'Burgers and fries'),
        p('19', 'A sushi bento box'),
        p('01', 'The Himalayas from a plane window'),
      ],
    },
    { kind: 'text', text: 'I wander,', col: 4, span: 2, align: 'center' },
    {
      kind: 'strip',
      col: 6,
      imgs: [
        p('10', 'Brooklyn Bridge at dusk'),
        p('22', 'Waves along lakeside cliffs'),
        p('03', 'A camel in the desert at sunset'),
      ],
    },
  ],
  [
    {
      kind: 'strip',
      col: 1,
      imgs: [
        p('09', 'A snowy mountain drive'),
        p('18', 'Sunset by the sea'),
        p('20', 'An autumn river reflection'),
        p('21', 'Red barns seen from a car window'),
      ],
    },
    { kind: 'text', text: 'I cook,', col: 5, span: 2, align: 'center' },
    { kind: 'strip', col: 7, imgs: [p('13', 'A home-cooked family spread'), p('14', 'A dosa on a steel plate')] },
  ],
  [
    {
      kind: 'text',
      text: 'and I am learning to keep three plants alive.',
      col: 1,
      span: 2,
    },
    { kind: 'img', img: p('05', 'A dog on the beach'), col: 4 },
    { kind: 'phStrip', count: 3, col: 6, label: 'Three plants, photos coming soon' },
  ],
]

/** Open-notebook placeholder: the right page turns over on a loop. */
function JournalBook({ layout }: { layout?: PieceLayout }) {
  const { style, editProps } = usePiece('book', 'Journal book', 'book', layout)
  return (
    <div
      className={styles.book}
      role="img"
      aria-label="Doodle journal, pages coming soon"
      style={style}
      {...editProps}
    >
      <div className={styles.bookPageLeft} />
      <div className={styles.bookPageRight} />
      <div className={styles.bookFlip} />
      <div className={styles.bookSpine} />
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

/** How many columns a block covers. */
function spanOf(block: Block) {
  if (block.kind === 'img') return 1
  if (block.kind === 'strip') return block.imgs.length
  if (block.kind === 'phStrip') return block.count
  return block.span
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
                const style = { gridColumn: `${block.col} / span ${spanOf(block)}` }

                if (block.kind === 'text') {
                  return (
                    <div
                      key={bi}
                      className={`${styles.cellText} ${
                        block.align === 'center' ? styles.cellTextCentre : ''
                      }`}
                      style={style}
                    >
                      <Note text={block.text} layout={block.layout} />
                    </div>
                  )
                }
                if (block.kind === 'book') {
                  return (
                    <div key={bi} className={styles.cellBook} style={style}>
                      <JournalBook layout={block.layout} />
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
                  return (
                    <div key={bi} className={styles.cellStrip} style={style}>
                      {block.imgs.map(img => (
                        <Square key={img.src} img={img} />
                      ))}
                    </div>
                  )
                }
                if (block.kind === 'phStrip') {
                  return (
                    <div
                      key={bi}
                      className={styles.cellStrip}
                      style={style}
                      role="img"
                      aria-label={block.label}
                    >
                      {Array.from({ length: block.count }, (_, i) => (
                        <span key={i} className={styles.placeholder} />
                      ))}
                    </div>
                  )
                }
                return (
                  <div key={bi} className={styles.cellImg} style={style}>
                    <Square img={block.img} />
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
