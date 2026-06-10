import {
  EditableImage,
  EditableProvider,
  EditableText,
} from '~/components/editable/Editable'
import { EditPanel } from '~/components/editable/EditPanel'
import styles from './AboutDesktop.module.css'

const BODY_TEXT =
  "I'm Mrinal, a designer and strategist. I work across research, strategy and design on problems that matter, where design can genuinely change how people think, act, and experience the world around them."

/** Locked-in default sizes for the photo. */
const IMAGE_DEFAULTS = { width: 300, height: 380, radius: 8, posX: 50, posY: 45 }
/** Locked-in default sizes for the body text box. */
const TEXT_DEFAULTS = { fontSize: 15, width: 340, height: 170 }

export function AboutDesktop() {
  return (
    <EditableProvider>
      <section className={styles.screen}>
        <div className={styles.stage}>
          <span className={`${styles.word} ${styles.hi}`}>Hi,</span>
          <span className={`${styles.word} ${styles.im}`}>I&rsquo;m</span>

          <EditableImage
            id="about-photo"
            label="About photo"
            src="/images/about_image.webp"
            alt="Mrinal Jadhav"
            className={styles.photo}
            defaults={IMAGE_DEFAULTS}
          />

          <span className={`${styles.word} ${styles.name}`}>Mrinal!</span>

          <EditableText
            id="about-body"
            label="Body text"
            className={styles.body}
            defaults={TEXT_DEFAULTS}
          >
            {BODY_TEXT}
          </EditableText>
        </div>

        {import.meta.env.DEV && <EditPanel />}
      </section>
    </EditableProvider>
  )
}
