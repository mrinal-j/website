import styles from './Statements.module.css'

const STATEMENT =
  'I design at the intersection of research, strategy, and impact, focused on problems where good design can help business growth and social impact reinforce each other.'

export function Statements() {
  return (
    <section id="statements" className={styles.section}>
      <div className={styles.content}>
        <p className={styles.text}>{STATEMENT}</p>
      </div>
    </section>
  )
}
