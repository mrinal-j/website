import styles from './Experience.module.css'

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
    logo: '/images/crafd_logo.webp',
  },
  {
    org: 'The New School',
    role: 'Communications and Events Assistant',
    dates: 'May 2024 – May 2025',
    place: 'New York, USA',
    logo: '/images/the_new_school_logo.webp',
  },
  {
    org: 'Immer',
    role: 'UX/UI Research and Design Intern',
    dates: 'June 2024 – August 2024',
    place: 'New York, USA',
    logo: '/images/immer_logo.webp',
  },
  {
    org: 'Kaaro',
    role: 'Co-Founder and Brand Designer',
    dates: 'January 2020 – August 2023',
    place: 'Bangalore, India',
    logo: '/images/kaaro_logo.webp',
  },
  {
    org: 'Go Native LLP',
    role: 'Brand Strategist and Designer',
    dates: 'June 2022 – July 2023',
    place: 'Bangalore, India',
    logo: '/images/go_native_logo.webp',
  },
]

export function Experience() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Previously&hellip;</h2>

      <ul className={styles.list}>
        {ROLES.map((r) => (
          <li key={r.org} className={styles.row}>
            <img src={r.logo} alt="" className={styles.logo} loading="lazy" />
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
        href="https://www.linkedin.com/in/mrinal-jadhav-157a09197/"
        target="_blank"
        rel="noopener"
      >
        more on LinkedIn
      </a>
    </section>
  )
}
