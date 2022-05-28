import React from 'react'
import ProtectedProject from './ProtectedProject'
import PublicProject from './PublicProject'
import { SingleProjectProps } from '../../../globalTypes'

const SingleProject = ({ project }: SingleProjectProps) => {
  if (project.isProtected) {
    return <ProtectedProject project={project} />
  } else {
    return <PublicProject project={project} />
  }
}

export default SingleProject
