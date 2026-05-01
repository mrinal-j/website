import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  title: string
  dark?: boolean
  /** Optional; omit to hide the leading number */
  number?: string
}

export function SectionLabel({ title, dark, number }: SectionLabelProps) {
  return (
    <div className={`${styles.wrapper} ${dark ? styles.dark : ''}`}>
      {number != null && number !== '' && (
        <span className={styles.number}>{number}</span>
      )}
      <span className={styles.title}>{title}</span>
      <div className={styles.line} />
    </div>
  )
}
