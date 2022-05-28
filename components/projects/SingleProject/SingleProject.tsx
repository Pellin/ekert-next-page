import React from 'react'
import ProtectedProject from './ProtectedProject'
import PublicProject from './PublicProject'
import { SingleProjectProps } from '../../../globalTypes'

const SingleProject = ({ project, images, videos }: SingleProjectProps) => {
  if (project.isProtected) {
    return (
      <ProtectedProject project={project} images={images} videos={videos} />
    )
  } else {
    return <PublicProject project={project} images={images} videos={videos} />
  }
}

export default SingleProject
