import { useMemo } from 'react'
import { useChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceToNextLevel } = useChallengeContext()

  const percentToNextLevel = useMemo(() => {
    return Math.round(currentExperience * 100) / experienceToNextLevel
  }, [currentExperience, experienceToNextLevel])

  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel ?? 0}%` }}
        >
          {currentExperience} xp
        </span>
      </div>

      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}

export default ExperienceBar
