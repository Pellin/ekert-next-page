import React from 'react'
import { MultipleProjectsProps } from '../../../globalTypes'
import PublicProjectCard from './components/PublicProjectCard'
import styles from './PublicProjects.module.scss'

const PublicProjects = ({ projects, images }: MultipleProjectsProps) => {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.projectList}>
        {projects.map((project) => (
          <PublicProjectCard
            key={project._id}
            project={project}
            images={images}
          />
        ))}
      </ul>
    </div>
  )
}

export default PublicProjects
