import {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import JSCookie from 'js-cookie'

import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'

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
  startNewChallenge: () => void
  completeChallenge: () => void
  resetChallenge: () => void
  closeLevelUpModal: () => void
}

interface ChallengeProviderProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

const ChallengesContext = createContext({} as ChallengeContextData)

const ChallengeProvider: React.FC<ChallengeProviderProps> = ({
  children,
  ...rest
}) => {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted
  )
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    JSCookie.set('level', String(level))
    JSCookie.set('currentExperience', String(currentExperience))
    JSCookie.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, currentChallenge])

  const calcExperienceToNextLevel = useCallback((levelParam: number) => {
    return (levelParam + 1) * 4 ** 2
  }, [])

  const experienceToNextLevel = useMemo(() => {
    return calcExperienceToNextLevel(level)
  }, [level])

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false)
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

    setCurrentExperience(finalExperience)
    setCurrentChallenge(null)
    if (level !== tempLevel) {
      setLevel(tempLevel)
      setIsLevelUpModalOpen(true)
    }
    setChallengesCompleted(oldChallengesCompleted => oldChallengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        currentChallenge,
        experienceToNextLevel,
        completeChallenge,
        resetChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}

export const useChallengeContext = (): ChallengeContextData => {
  return useContext(ChallengesContext)
}

export default ChallengeProvider
