import React, { SyntheticEvent, useState } from 'react'
import PublicProject from './PublicProject'
import { SingleProjectProps } from '../../../globalTypes'
import ProtectedProjectLogin from './ProtectedProjectLogin'
import { verifyPassword } from '../../../db/utils'

const ProtectedProject = ({ project }: SingleProjectProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleLogin = async (e: SyntheticEvent, password: string) => {
    e.preventDefault()

    setShowError(false)
    const validPassword = await verifyPassword(password, project.password!)

    if (validPassword) {
      setIsLoggedIn(true)
    } else {
      setShowError(true)
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <PublicProject project={project!} />
      ) : (
        <ProtectedProjectLogin login={handleLogin} showError={showError} />
      )}
    </>
  )
}

export default ProtectedProject
