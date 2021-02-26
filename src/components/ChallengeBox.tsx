import { useChallengeContext } from '../contexts/ChallengeContext'
import { useCountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

const ChallengeBox: React.FC = () => {
  const {
    currentChallenge,
    completeChallenge,
    resetChallenge,
  } = useChallengeContext()
  const { resetCountdown } = useCountdownContext()

  const handleChallengeSucceeded = () => {
    completeChallenge()
    resetCountdown()
  }

  const handleChallengeFailed = () => {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {currentChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {currentChallenge.amount} xp</header>

          <main>
            <img src={`icons/${currentChallenge.type}.svg`} alt="Body" />
            <strong>Novo Desafio</strong>
            <p>{currentChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}

export default ChallengeBox
