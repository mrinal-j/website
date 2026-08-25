import { SectionLabel } from '~/components/SectionLabel'
import styles from './Experience.module.css'

// `logo` is optional: rows without one show a quiet initial tile until a
// real logo file is added to /public/images.
const ROLES = [
  {
    org: 'United Nations - Executive Office of the Secretary-General (UN80 Initiative)',
    role: 'Design Lead - Brand and Digital Communications',
    dates: 'November 2025 – July 2026',
    place: 'New York, USA',
    logo: '/images/un80-avatar.webp',
  },
  {
    org: 'United Nations - Executive Office of the Secretary-General (Complex Risk Analytics Fund)',
    role: 'Design Strategic Communications Fellow',
    dates: 'August 2025 – November 2025',
    place: 'New York, USA',
  },
  {
    org: 'The New School',
    role: 'Communications and Events Assistant',
    dates: 'May 2024 – May 2025',
    place: 'New York, USA',
  },
  {
    org: 'Immer',
    role: 'UX/UI Research and Design Intern',
    dates: 'June 2024 – August 2024',
    place: 'New York, USA',
  },
  {
    org: 'Kaaro',
    role: 'Co-Founder and Brand Designer',
    dates: 'January 2020 – August 2023',
    place: 'Bangalore, India',
    logo: '/images/kaaro_gingko.webp',
  },
  {
    org: 'Go Native LLP',
    role: 'Brand Strategist and Designer',
    dates: 'June 2022 – July 2023',
    place: 'Bangalore, India',
  },
]

export function Experience() {
  return (
    <section className={styles.section}>
      <SectionLabel title="EXPERIENCE" noLine />

      <ul className={styles.list}>
        {ROLES.map((r) => (
          <li key={r.org} className={styles.row}>
            {r.logo ? (
              <img src={r.logo} alt="" className={styles.logo} loading="lazy" />
            ) : (
              <span className={styles.logoFallback} aria-hidden="true">
                {r.org[0]}
              </span>
            )}
            <div className={styles.left}>
              <p className={styles.org}>{r.org}</p>
              <p className={styles.role}>{r.role}</p>
            </div>
            <div className={styles.right}>
              <p className={styles.dates}>{r.dates}</p>
              <p className={styles.place}>{r.place}</p>
            </div>
          </li>
        ))}
      </ul>

      <a
        className={styles.resume}
        href="/resume.pdf"
        target="_blank"
        rel="noopener"
      >
        Full r&eacute;sum&eacute; (PDF) <span aria-hidden="true">&rarr;</span>
      </a>
    </section>
  )
}
