import Head from 'next/head'

import { GetServerSideProps } from 'next'
import CountdownProvider from '../src/contexts/CountdownContext'

import ExperienceBar from '../src/components/ExperienceBar'
import Profile from '../src/components/Profile'
import CompletedChallenges from '../src/components/CompletedChallenges'
import Countdown from '../src/components/Countdown'
import ChallengeBox from '../src/components/ChallengeBox'

import styles from '../src/styles/pages/Home.module.css'
import ChallengeProvider from '../src/contexts/ChallengeContext'

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

const Home: React.FC<HomeProps> = ({
  level,
  currentExperience,
  challengesCompleted,
}) => {
  return (
    <ChallengeProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const {
    level = 1,
    currentExperience = 0,
    challengesCompleted = 0,
  } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}

export default Home
