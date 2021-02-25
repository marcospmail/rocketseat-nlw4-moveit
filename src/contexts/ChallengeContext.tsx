import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react'

import challenges from '../../challenges.json'

enum ChallengeType {
  BODY = 'body',
  EYE = 'eye',
}

interface Challenge {
  type: ChallengeType
  description: string
  amount: number
}

interface ChallengeContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  experienceToNextLevel: number
  currentChallenge: Challenge
  levelUp: () => void
  startNewChallenge: () => void
  completeChallenge: () => void
  resetChallenge: () => void
}

const ChallengesContext = createContext({} as ChallengeContextData)

const ChallengeProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(30)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(null)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  const calcExperienceToNextLevel = useCallback((levelParam: number) => {
    return (levelParam + 1) * 4 ** 2
  }, [])

  const experienceToNextLevel = useMemo(() => {
    return calcExperienceToNextLevel(level)
  }, [level])

  const levelUp = () => {
    setLevel(oldLevel => oldLevel + 1)
  }

  const startNewChallenge = () => {
    const newChallengeIndex = Math.floor(Math.random() * challenges.length)
    const newChallenge = challenges[newChallengeIndex] as Challenge

    setCurrentChallenge(newChallenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      /* eslint-disable no-new */
      new Notification('Novo desafio', {
        body: `Valendo ${newChallenge.amount}xp`,
      })
    }
  }

  const resetChallenge = () => {
    setCurrentChallenge(null)
  }

  const completeChallenge = () => {
    if (!currentChallenge) {
      return
    }

    const { amount } = currentChallenge

    let tempLevel = level
    let tempCurrentExperience = currentExperience
    let tempExperienceToNextLevel = experienceToNextLevel

    let finalExperience = currentExperience + amount

    while (finalExperience >= tempExperienceToNextLevel) {
      finalExperience -= tempExperienceToNextLevel - tempCurrentExperience
      tempLevel += 1
      tempExperienceToNextLevel = calcExperienceToNextLevel(tempLevel)

      tempCurrentExperience = 0
    }

    setLevel(tempLevel)
    setCurrentExperience(finalExperience)
    setCurrentChallenge(null)
    setChallengesCompleted(oldChallengesCompleted => oldChallengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        currentChallenge,
        experienceToNextLevel,
        completeChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export const useLevelContext = (): ChallengeContextData => {
  return useContext(ChallengesContext)
}

export default ChallengeProvider
