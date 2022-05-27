import { SyntheticEvent, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from './AdminAuthForm.module.scss'
import Button from '../../../ui/Button'

const AuthForm = () => {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    const result: any = await signIn('credentials', {
      redirect: false,
      name: nameRef.current!.value,
      password: passwordRef.current!.value,
    })

    if (!result.error) {
      router.replace('/admin')
    }
  }

  return (
    <section className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <input
          id="name"
          ref={nameRef}
          placeholder="Namn"
          autoComplete="off"
          type="text"
          required
        />

        <input
          id="password"
          ref={passwordRef}
          placeholder="Lösenord"
          autoComplete="off"
          type="password"
          required
        />

        <Button
          title="Logga in"
          text={isLoggingIn ? 'Loggar in...' : 'Logga in'}
          backgroundColor="#65aa65"
          color="#fff"
        />
      </form>
    </section>
  )
}

export default AuthForm
