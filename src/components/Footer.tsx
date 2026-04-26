import styles from './Footer.module.css'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Main CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaHeading}>Building something that matters?</h2>
          <a href="mailto:mrinal.r.jadhav@gmail.com" className={styles.ctaCircle}>
            Say hello!
          </a>
        </div>

        {/* Social links + available badge on the right */}
        <div className={styles.socialRow}>
          <div className={styles.socialLinks}>
            <a
              href="https://www.linkedin.com/in/mrinal-jadhav-157a09197/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <span className={styles.socialIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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

          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>Available to work</span>
          </div>
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
