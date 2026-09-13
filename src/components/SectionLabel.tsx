import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  title: string
  dark?: boolean
  /**
   * For labels sitting on a mid-tone colour rather than white or near-black:
   * darkens the type enough to clear the contrast bar on that background.
   */
  onColor?: boolean
}

export function SectionLabel({ title, dark, onColor }: SectionLabelProps) {
  return (
    <div
      className={`${styles.wrapper} ${dark ? styles.dark : ''} ${
        onColor ? styles.onColor : ''
      }`}
    >
      <span className={styles.title}>{title}</span>
    </div>
  )
}
