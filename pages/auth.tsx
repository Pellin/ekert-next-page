import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AuthForm from '../components/admin/Auth/AuthForm'

const AuthPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/admin')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  if (isLoading) {
    return <p>Laddar...</p>
  }

  return <AuthForm />
}

export default AuthPage
