import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { IProject } from '../../../globalTypes'
import connect from '../../../db/connect'
import Project from '../../../db/models/Project'

type SingleProjectProps = {
  project: IProject
}

const AdminSingleProjectPage: NextPage<SingleProjectProps> = ({ project }) => {
  return <h1>{project.title}</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connect()
  const slug = context.params!.slug as string
  const project = await Project.findOne({ slug })

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
  }
}

export default AdminSingleProjectPage
