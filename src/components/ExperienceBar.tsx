import { useMemo } from 'react'
import { useLevelContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceToNextLevel } = useLevelContext()

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
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>

      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}

export default ExperienceBar
