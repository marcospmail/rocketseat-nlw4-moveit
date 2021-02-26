import { useChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

const CompletedChallenges: React.FC = () => {
  const { challengesCompleted } = useChallengeContext()

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completados</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}

export default CompletedChallenges
