import { useLevelContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

const CompletedChallenges: React.FC = () => {
  const { challengesCompleted } = useLevelContext()

  return (
    <div className={styles.completedChallengesContainer}>
      <span>{challengesCompleted}</span>
      <span>5</span>
    </div>
  )
}

export default CompletedChallenges
