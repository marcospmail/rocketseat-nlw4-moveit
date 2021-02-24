import Head from 'next/head'

import ExperienceBar from '../src/components/ExperienceBar'
import Profile from '../src/components/Profile'
import CompletedChallenges from '../src/components/CompletedChallenges'
import Countdown from '../src/components/Countdown'
import ChallengeBox from '../src/components/ChallengeBox'

import styles from '../src/styles/pages/Home.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />

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
    </div>
  )
}

export default Home
