import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from './Layout.module.scss'

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className={styles.layout}>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout
