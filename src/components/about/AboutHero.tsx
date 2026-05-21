import { useEffect, useState } from 'react'
import { MeshGradient } from '~/components/home/MeshGradient'
import { AboutBinder } from './AboutBinder'
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

      <div className={`${styles.binderLayer} ${loaded ? styles.binderLayerVisible : ''}`}>
        <AboutBinder />
      </div>

    </div>
  )
}
