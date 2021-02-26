import { createContext, useContext, useEffect, useState } from 'react'

import { useChallengeContext } from './ChallengeContext'

interface CountdownContextData {
  minutes: number
  seconds: number
  isActive: boolean
  isFinished: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

const INITIAL_TIMER = 10 // 25 * 60

const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

const CountdownProvider: React.FC = ({ children }) => {
  const { startNewChallenge } = useChallengeContext()

  const [timer, setTimer] = useState(INITIAL_TIMER)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60

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

  const startCountdown = () => {
    setIsActive(true)
  }

  const resetTimer = () => {
    setTimer(INITIAL_TIMER)
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setIsFinished(false)
    resetTimer()
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        isFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}

export const useCountdownContext = (): CountdownContextData => {
  return useContext(CountdownContext)
}

export default CountdownProvider
