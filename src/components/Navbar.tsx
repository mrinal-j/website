import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import styles from './Navbar.module.css'

interface NavbarProps {
  /** Keep the bar visible at all times (e.g. case study pages). Home omits this and uses scroll past #statements. */
  alwaysVisible?: boolean
}

export function Navbar({ alwaysVisible = false }: NavbarProps) {
  const [visible, setVisible] = useState(alwaysVisible)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!alwaysVisible) {
        const target = document.getElementById('statements')
        if (!target) {
          setVisible(true)
        } else {
          setVisible(target.getBoundingClientRect().top <= 0)
        }
      }

      const footer = document.querySelector('footer')
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        setFooterVisible(footerRect.top < window.innerHeight)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [alwaysVisible])

  return (
    <nav className={`${styles.nav} ${visible && !footerVisible ? styles.navVisible : styles.navHidden}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src="/images/nav-icon.png" alt="Mrinal Jadhav" className={styles.logoIcon} />
          <span className={styles.logoText}>Mrinal Jadhav</span>
        </Link>
        <div className={styles.links}>
          <Link to="/" className={styles.navLink}>Work</Link>
          <Link to="/" className={styles.navLink} hash="about">About</Link>
          <Link to="/" className={styles.navLink}>Play</Link>
          <span className={styles.divider} />
          <a href="mailto:mrinal.r.jadhav@gmail.com" className={styles.iconLink} aria-label="Email" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a href="/resume.pdf" className={styles.iconLink} aria-label="Resume" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/mrinal-jadhav-157a09197/" className={styles.iconLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
