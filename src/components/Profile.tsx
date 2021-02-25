import { useLevelContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

const Profile: React.FC = () => {
  const { level } = useLevelContext()

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/marcospmail.png" alt="Marcos Paulo" />
      <div>
        <strong>Marcos Paulo</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile
