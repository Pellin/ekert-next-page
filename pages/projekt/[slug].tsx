import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import connect from '../../db/connect'
import Project from '../../db/models/Project'
import SingleProject from '../../components/projects/SingleProject'
import { IProject, SingleProjectProps } from '../../globalTypes'

const SingleProjectPage = ({ project }: SingleProjectProps) => {
  return <SingleProject project={project} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  await connect()

  const projectsResponse = await Project.find()
  const projects = JSON.parse(JSON.stringify(projectsResponse)) as IProject[]

  const paths = projects.map((project) => ({ params: { slug: project.slug } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  await connect()

  const slug = context.params!.slug as string

  const projectResponse = await Project.findOne({ slug })

  const project = JSON.parse(JSON.stringify(projectResponse)) as IProject

  return {
    props: {
      project,
    },
    revalidate: 60 * 60,
  }
}

export default SingleProjectPage
