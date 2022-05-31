import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import AdminContextProvider from '../contexts/admin/AdminContext'
import CustomHead from '../components/global/CustomHead'
import Layout from '../components/layout/Layout'
import '../styles/globals.scss'

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps

  return (
    <SessionProvider>
      <CustomHead />
      <Layout>
        {session ? (
          <AdminContextProvider>
            <Component {...pageProps} />
          </AdminContextProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  )
}

export default App
