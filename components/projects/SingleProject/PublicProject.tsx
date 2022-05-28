import React from 'react'
import { SingleProjectProps } from '../../../globalTypes'
import styles from './SingleProject.module.scss'

const PublicProject = ({ project }: SingleProjectProps) => {
  return (
    <div className={styles.singleProjectContainer}>
      <h1>{project!.title}</h1>
      <p>{project!.description}</p>
    </div>
  )
}

export default PublicProject
