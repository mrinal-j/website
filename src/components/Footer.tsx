import styles from './Footer.module.css'

export function Footer() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mrinal.r.jadhav@gmail.com')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Available badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeText}>Available to work</span>
        </div>

        {/* Email section */}
        <div className={styles.emailSection}>
          <p className={styles.label}>EMAIL</p>
          <div className={styles.emailRow}>
            <a href="mailto:mrinal.r.jadhav@gmail.com" className={styles.emailLink}>
              mrinal.r.jadhav@gmail.com
            </a>
            <button className={styles.copyBtn} onClick={handleCopyEmail} type="button">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              COPY
            </button>
          </div>
        </div>

        {/* Social links */}
        <div className={styles.socialLinks}>
          <a
            href="https://www.linkedin.com/in/mrinal-jadhav-157a09197/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.socialIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className={styles.socialLabel}>LINKEDIN</span>
          </a>
          <a
            href="https://www.behance.net/mrinaljadhav"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.socialIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
              </svg>
            </span>
            <span className={styles.socialLabel}>BEHANCE</span>
          </a>
        </div>

        {/* Footer bar */}
        <div className={styles.footerBar}>
          <span className={styles.copyright}>&copy; 2026 Copyright Mrinal Jadhav</span>
          <button className={styles.scrollTopBtn} onClick={scrollToTop} type="button" aria-label="Scroll to top">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
