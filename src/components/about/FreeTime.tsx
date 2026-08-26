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
  | { kind: 'word'; text: string }
  | { kind: 'img'; src: string; alt: string }
  | { kind: 'book' }

const ROWS: Piece[][] = [
  [
    { kind: 'word', text: 'Outside of work,' },
    { kind: 'book' },
    { kind: 'word', text: 'I doodle,' },
  ],
  [
    { kind: 'img', src: '/images/about-photo-02.webp', alt: 'A thali lunch' },
    { kind: 'word', text: 'I feast,' },
    { kind: 'img', src: '/images/about-photo-08.webp', alt: 'Dim sum' },
    { kind: 'img', src: '/images/about-photo-23.webp', alt: 'Ramen and bao' },
  ],
  [
    { kind: 'img', src: '/images/about-photo-12.webp', alt: 'Brunch plates' },
    { kind: 'img', src: '/images/about-photo-04.webp', alt: 'Burgers and fries' },
    { kind: 'img', src: '/images/about-photo-19.webp', alt: 'A sushi bento box' },
    { kind: 'word', text: 'I wander,' },
  ],
  [
    { kind: 'img', src: '/images/about-photo-01.webp', alt: 'The Himalayas from a plane window' },
    { kind: 'img', src: '/images/about-photo-10.webp', alt: 'Brooklyn Bridge at dusk' },
    { kind: 'img', src: '/images/about-photo-22.webp', alt: 'Waves along lakeside cliffs' },
    { kind: 'img', src: '/images/about-photo-03.webp', alt: 'A camel in the desert at sunset' },
    { kind: 'img', src: '/images/about-photo-20.webp', alt: 'An autumn river reflection' },
  ],
  [
    { kind: 'img', src: '/images/about-photo-13.webp', alt: 'A home-cooked family spread' },
    { kind: 'word', text: 'I cook,' },
    { kind: 'img', src: '/images/about-photo-14.webp', alt: 'A dosa on a steel plate' },
  ],
  [
    { kind: 'img', src: '/images/about-photo-05.webp', alt: 'A dog on the beach' },
    { kind: 'word', text: 'and mostly, I dilly dally.' },
    { kind: 'img', src: '/images/about-photo-21.webp', alt: 'Red barns seen from a car window' },
  ],
  [{ kind: 'word', text: '...and I call it research.' }],
]

/** Small open-notebook placeholder: the right page flips over on a loop. */
function JournalBook() {
  return (
    <div className={styles.book} role="img" aria-label="Doodle journal, pages coming soon">
      <div className={styles.bookPageLeft} />
      <div className={styles.bookPageRight} />
      <div className={styles.bookFlip} />
      <div className={styles.bookSpine} />
    </div>
  )
}

export function FreeTime() {
  return (
    <section className={styles.section}>
      <h2 className="visually-hidden">Outside of work</h2>

      <div className={styles.collage}>
        {ROWS.map((row, ri) => (
          <div key={ri} className={styles.collageRow}>
            {row.map((piece, pi) => {
              if (piece.kind === 'word') {
                return (
                  <span key={pi} className={styles.collageWord}>
                    {piece.text}
                  </span>
                )
              }
              if (piece.kind === 'book') {
                return <JournalBook key={pi} />
              }
              return (
                <img
                  key={pi}
                  src={piece.src}
                  alt={piece.alt}
                  className={styles.tile}
                  loading="lazy"
                />
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
