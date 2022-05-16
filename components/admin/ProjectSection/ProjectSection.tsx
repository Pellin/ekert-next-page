import React, { useContext } from 'react'
import { AdminContext } from '../../../contexts/admin/AdminContext'
import NewProjectForm from './NewProjectForm'
import ProjectList from './ProjectList'

const ProjectSection = () => {
  const { projects } = useContext(AdminContext)!

  return (
    <section>
      <h2>Projekt</h2>
      <ProjectList projects={projects} />
      <NewProjectForm />
    </section>
  )
}

export default ProjectSection
