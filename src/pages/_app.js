// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import App from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { AppContext } from 'src/context/app-context'
import { useState } from 'react'
import { getSession, SessionProvider } from 'next-auth/react'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const MyApp = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  console.log("Got Session: ", pageProps.session);

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  // const session = useSession()
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SessionProvider
        session={pageProps.session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              // console.log("setting: ", settings)

              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </SessionProvider>
    </CacheProvider >
  )
}

// MyApp.getInitialProps = async (context) => {
//   const appProps = await App.getInitialProps(context)
//   const session = await getSession(context.ctx)
//   console.log("session from _app :", session)

//   return {
//     ...appProps,
//     session
//   }
// }

export default MyApp
