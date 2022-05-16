import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.innerWrapper}>
        <Link href="/">
          <div className={styles.imageWrapper}>
            <Image
              className={styles.logo}
              src={'/images/ae-logo.png'}
              alt="Anders Ekert"
              width={100}
              height={100}
            />
          </div>
        </Link>
        <h1>ANDERS EKERT PRODUKTION</h1>
      </div>
    </header>
  )
}

export default Header
