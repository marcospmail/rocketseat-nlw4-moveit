import { createContext, ReactNode, useState, useContext, useMemo } from 'react'

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
}

interface ChallengeProviderProps {
  children: ReactNode
}

const ChallengesContext = createContext({} as ChallengeContextData)

const ChallengeProvider: React.FC<ChallengeProviderProps> = ({ children }) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(30)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(null)

  const experienceToNextLevel = useMemo(() => {
    return (level + 1) * 4 ** 2
  }, [level])

  const levelUp = () => {
    setLevel(oldLevel => oldLevel + 1)
  }

  const startNewChallenge = () => {
    const newChallengeIndex = Math.floor(Math.random() * challenges.length)
    const newChallenge = challenges[newChallengeIndex] as Challenge

    setCurrentChallenge(newChallenge)
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
