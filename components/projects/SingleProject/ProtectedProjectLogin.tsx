import React, { SyntheticEvent, useState } from 'react'
import Image from 'next/image'
import Button from '../../ui/Button'
import styles from './SingleProject.module.scss'

type ProtectedProjectLoginProps = {
  login: (e: SyntheticEvent, password: string) => Promise<void>
  showError: boolean
}

const ProtectedProjectLogin = ({
  login,
  showError,
}: ProtectedProjectLoginProps) => {
  const [password, setPassword] = useState('')

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={(e) => login(e, password)}>
        <div className={styles.lockIconWrapper}>
          <Image
            src="/icons/lock-icon.png"
            alt="Lås"
            height={20}
            width={20}
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <p>Det här projektet är skyddat. Lösenord krävs för att logga in.</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="text"
          placeholder="Lösenord"
        />
        {showError && (
          <div className={styles.error}>
            <p>Felaktigt lösenord</p>
          </div>
        )}
        <Button
          disabled={!password.length}
          title="Logga in"
          text="Logga in"
          backgroundColor="#65aa65"
          color="#fff"
        />
      </form>
    </div>
  )
}

export default ProtectedProjectLogin
