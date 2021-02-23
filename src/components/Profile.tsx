import styles from '../styles/components/Profile.module.css'

const Profile: React.FC = () => (
  <div className={styles.profileContainer}>
    <img src="https://github.com/marcospmail.png" alt="Marcos Paulo" />
    <div>
      <strong>Marcos Paulo</strong>
      <p>
        <img src="icons/level.svg" alt="Level" />
        Level 1
      </p>
    </div>
  </div>
)

export default Profile
