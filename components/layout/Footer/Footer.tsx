import React from 'react'
import Image from 'next/image'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoWrapper}>
        <Image
          src="/images/ae-logo-white.png"
          alt="AE Logo"
          height={100}
          layout="responsive"
          objectFit="contain"
          width={100}
        />
      </div>
      <address className={styles.adressBox}>
        <h3>Anders Ekert Produktion AB</h3>
        <p>Sandfjärdsgatan 84, 120 56 Årsta</p>
        <p className={styles.phone}>+46 708 761 101</p>
        <a href="mailto:anders.ekert@gmail.com">anders.ekert@gmail.com</a>
        <p
          className={styles.copyright}
        >{`© Anders Ekert ${new Date().getFullYear()}`}</p>
      </address>
    </footer>
  )
}

export default Footer
