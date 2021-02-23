import { useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'

const Countdown: React.FC = () => {
  const [timer, setTimer] = useState(25 * 60)
  const [active, setActive] = useState(false)

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  const startCountdown = () => {
    setActive(true)
  }

  useEffect(() => {
    if (!active || timer === 0) return

    setTimeout(() => {
      setTimer(oldTimer => oldTimer - 1)
    }, 1000)
  }, [active, timer])

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </>
  )
}

export default Countdown
