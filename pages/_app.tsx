import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import AdminContextProvider from '../contexts/admin/AdminContext'
import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AdminContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AdminContextProvider>
  )
}

export default MyApp
