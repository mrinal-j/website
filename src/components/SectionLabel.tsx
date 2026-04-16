import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  number: string
  title: string
  dark?: boolean
}

export function SectionLabel({ number, title, dark }: SectionLabelProps) {
  return (
    <div className={`${styles.wrapper} ${dark ? styles.dark : ''}`}>
      <span className={styles.number}>{number}</span>
      <span className={styles.title}>{title}</span>
      <div className={styles.line} />
    </div>
  )
}
