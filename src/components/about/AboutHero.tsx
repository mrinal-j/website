import { useEffect, useState } from 'react'
import { MeshGradient } from '~/components/home/MeshGradient'
import styles from './AboutHero.module.css'

const MESH_COLORS: [string, string, string, string, string, string] = [
  '#ffb375',
  '#ffd8b8',
  '#ff8e42',
  '#ffa270',
  '#ffcda3',
  '#f98c43',
]

export function AboutHero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.container}>
      <div className={`${styles.meshLayer} ${loaded ? styles.meshLayerVisible : ''}`}>
        <MeshGradient colors={MESH_COLORS} />
      </div>

      <div className={`${styles.content} ${loaded ? styles.contentVisible : ''}`}>
        {/* content slot — add text/bio here */}
      </div>

      <div className={styles.scrollArrow}>
        <svg
          width="18"
          height="11"
          viewBox="0 0 22 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 2l9 10 9-10" />
        </svg>
      </div>
    </div>
  )
}
