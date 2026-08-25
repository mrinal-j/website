import { SectionLabel } from '~/components/SectionLabel'
import styles from './FreeTime.module.css'

/**
 * "In my free time" — a journal spread (placeholder for now) followed by two
 * collages where big words and small photos interleave, magazine-ad style.
 * Every image is a striped placeholder until real photos are ready.
 */

type Piece =
  | { kind: 'word'; text: string }
  | { kind: 'img'; caption: string; w: number; h: number; dy?: number }

const FOOD_ROWS: Piece[][] = [
  [
    { kind: 'word', text: 'Food' },
    { kind: 'img', caption: '(01) khichdi, home', w: 150, h: 120, dy: -14 },
    { kind: 'word', text: 'I’ve' },
    { kind: 'img', caption: '(02) dosa, Bangalore', w: 140, h: 95, dy: 6 },
    { kind: 'word', text: 'loved' },
  ],
  [
    { kind: 'img', caption: '(03) bagel, Brooklyn', w: 145, h: 90, dy: 0 },
    { kind: 'word', text: 'eating,' },
    { kind: 'img', caption: '(04) ramen, East Village', w: 105, h: 130, dy: -10 },
    { kind: 'img', caption: '(05) filter coffee', w: 92, h: 115, dy: 4 },
  ],
]

const PLACES_ROWS: Piece[][] = [
  [
    { kind: 'word', text: 'Places' },
    { kind: 'img', caption: '(01) Hampi', w: 145, h: 90, dy: -8 },
    { kind: 'word', text: 'I’ve' },
    { kind: 'img', caption: '(02) Lisbon', w: 102, h: 122, dy: 10 },
  ],
  [
    { kind: 'img', caption: '(03) Jaipur', w: 145, h: 95, dy: 0 },
    { kind: 'word', text: 'loved' },
    { kind: 'img', caption: '(04) Brooklyn Bridge', w: 106, h: 150, dy: -6 },
    { kind: 'word', text: 'exploring' },
  ],
  [{ kind: 'img', caption: '(05) Kochi backwaters', w: 175, h: 95, dy: 0 }],
]

function Collage({
  rows,
  variant,
}: {
  rows: Piece[][]
  variant: 'food' | 'places'
}) {
  return (
    <div className={styles.collage}>
      {rows.map((row, ri) => (
        <div key={ri} className={styles.collageRow}>
          {row.map((piece, pi) =>
            piece.kind === 'word' ? (
              <span key={pi} className={styles.collageWord}>
                {piece.text}
              </span>
            ) : (
              <figure
                key={pi}
                className={styles.collageFigure}
                style={{ transform: `translateY(${piece.dy ?? 0}px)` }}
              >
                <div
                  className={`${styles.placeholder} ${
                    variant === 'food' ? styles.warm : styles.cool
                  }`}
                  style={{ width: piece.w, height: piece.h }}
                />
                <figcaption className={styles.caption}>
                  {piece.caption}
                </figcaption>
              </figure>
            ),
          )}
        </div>
      ))}
    </div>
  )
}

export function FreeTime() {
  return (
    <section className={styles.section}>
      <SectionLabel title="OUTSIDE OF WORK" noLine />

      {/* Journal spread — media is intentionally blank until the gif exists */}
      <div className={styles.journal}>
        <div className={styles.journalText}>
          <h3 className={styles.journalTitle}>
            I&rsquo;m drawing out patterns.
          </h3>
          <p className={styles.journalBody}>
            A notebook of doodles and repeating patterns I keep filling.
            Scroll to turn the pages.
          </p>
        </div>
        <figure className={styles.journalMedia}>
          <div className={`${styles.journalPlaceholder} ${styles.warm}`} />
          <figcaption className={styles.caption}>
            journal.gif: pattern doodles, flips on scroll
          </figcaption>
        </figure>
      </div>

      <Collage rows={FOOD_ROWS} variant="food" />
      <Collage rows={PLACES_ROWS} variant="places" />
    </section>
  )
}
