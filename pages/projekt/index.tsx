import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Project from '../../db/models/Project'
import Image from '../../db/models/Image'
import { IImage, IProject, MultipleProjectsProps } from '../../globalTypes'
import PublicProjects from '../../components/projects/PublicProjects'

const ProjectPage: NextPage<MultipleProjectsProps> = ({ projects, images }) => {
  return <PublicProjects projects={projects} images={images} />
}

export const getStaticProps: GetStaticProps = async () => {
  const projectResponse = await Project.find()
  const projects = JSON.parse(JSON.stringify(projectResponse)) as IProject[]
  const ImageResponse = await Image.find()
  const images = JSON.parse(JSON.stringify(ImageResponse)) as IImage[]
  return {
    props: {
      projects,
      images,
    },
  }
}

export default ProjectPage
