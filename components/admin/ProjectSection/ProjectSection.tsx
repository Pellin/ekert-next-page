import React, { useContext } from 'react'
import { AdminContext } from '../../../contexts/admin/AdminContext'
import NewProjectForm from './NewProjectForm'
import ProjectList from './ProjectList'
import styles from '../AdminContent/AdminContent.module.scss'
const ProjectSection = () => {
  const { projects } = useContext(AdminContext)!

  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2>Projekt</h2>
      </div>
      <div className={styles.empty}></div>
      <ProjectList projects={projects} />
      <NewProjectForm />
    </section>
  )
}

export default ProjectSection
