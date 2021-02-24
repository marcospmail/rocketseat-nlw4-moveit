import { AppProps } from 'next/dist/next-server/lib/router/router'

import ChallengeProvider from '../src/contexts/ChallengeContext'

import '../src/styles/global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChallengeProvider>
      <Component {...pageProps} />
    </ChallengeProvider>
  )
}

export default MyApp
