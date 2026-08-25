import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  title: string
  dark?: boolean
  /**
   * For labels sitting on a mid-tone colour rather than white or near-black:
   * darkens the type enough to clear the contrast bar on that background.
   */
  onColor?: boolean
  /** Optional; omit to hide the leading number */
  number?: string
  /** Hides the trailing fade-out line (used on the About page) */
  noLine?: boolean
}

export function SectionLabel({ title, dark, onColor, number, noLine }: SectionLabelProps) {
  return (
    <div
      className={`${styles.wrapper} ${dark ? styles.dark : ''} ${
        onColor ? styles.onColor : ''
      }`}
    >
      {number != null && number !== '' && (
        <span className={styles.number}>{number}</span>
      )}
      <span className={styles.title}>{title}</span>
      {!noLine && <div className={styles.line} />}
    </div>
  )
}
