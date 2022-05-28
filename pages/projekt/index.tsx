import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import connect from '../../db/connect'
import Project from '../../db/models/Project'
import Image from '../../db/models/Image'
import PublicProjects from '../../components/projects/PublicProjects'
import { IImage, IProject, MultipleProjectsProps } from '../../globalTypes'

const ProjectPage: NextPage<MultipleProjectsProps> = ({ projects, images }) => {
  return <PublicProjects projects={projects} images={images} />
}

export const getStaticProps: GetStaticProps = async () => {
  await connect()

  const projectResponse = await Project.find()
  const projects = JSON.parse(JSON.stringify(projectResponse)) as IProject[]
  const imageResponse = await Image.find()
  const images = JSON.parse(JSON.stringify(imageResponse)) as IImage[]

  return {
    props: {
      projects: projects.filter((project) => !project.isProtected),
      images: images.filter((image) => image.public),
    },
  }
}

export default ProjectPage
