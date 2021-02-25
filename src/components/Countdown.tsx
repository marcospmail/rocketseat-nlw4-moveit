import { useLevelContext } from '../contexts/ChallengeContext'
import { useCountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'
import CompletedChallenges from './CompletedChallenges'

const Countdown: React.FC = () => {
  const {
    minutes,
    seconds,
    isFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useCountdownContext()

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {isFinished ? (
        <button type="button" disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </>
  )
}

export default Countdown
