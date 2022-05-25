import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
  const [headerUp, setHeaderUp] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [page, setPage] = useState('')

  const router = useRouter()

  useEffect(() => {
    setPage(router.pathname.slice(1))
  }, [router])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleScroll = () => {
    const scrollDown = window.pageYOffset > currentPosition

    if (scrollDown) {
      if (window.pageYOffset > 60) {
        setHeaderUp(true)
      } else {
        setHeaderUp(false)
      }
    } else {
      setHeaderUp(false)
    }

    setCurrentPosition(window.pageYOffset)
  }

  return (
    <header className={`${styles.header} ${headerUp && styles.navUp}`}>
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
        <p>{page.toUpperCase()}</p>
      </div>
    </header>
  )
}

export default Header
