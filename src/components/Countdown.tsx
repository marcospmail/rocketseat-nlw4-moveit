import { useEffect, useState } from 'react'
import { useLevelContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Countdown.module.css'

const INITIAL_TIMER = 5 // 25 * 60

let countdownTimeout: NodeJS.Timeout

const Countdown: React.FC = () => {
  const [timer, setTimer] = useState(INITIAL_TIMER)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const { startNewChallenge } = useLevelContext()

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  const startCountdown = () => {
    setIsActive(true)
  }

  const resetTimer = () => {
    setTimer(INITIAL_TIMER)
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    resetTimer()
  }

  useEffect(() => {
    if (!isActive) return

    if (isActive && timer === 0) {
      setIsFinished(true)
      setIsActive(false)
      startNewChallenge()
      return
    }

    countdownTimeout = setTimeout(() => {
      setTimer(oldTimer => oldTimer - 1)
    }, 1000)
  }, [isActive, timer])

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
