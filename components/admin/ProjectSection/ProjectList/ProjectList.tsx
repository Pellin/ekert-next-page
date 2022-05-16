import React from 'react'
import { ProjectListProps } from './types'
import ProjectCard from './components/ProjectCard'
import styles from './ProjectList.module.scss'

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <ul className={styles.projectList}>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ul>
  )
}

export default ProjectList
