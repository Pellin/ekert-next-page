import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { IProject } from '../../../globalTypes'
import Project from '../../../db/models/Project'
import connect from '../../../db/connect'
import SingleProject from '../../../components/admin/SingleProject'

type SingleProjectProps = {
  project: IProject
}

const AdminSingleProjectPage: NextPage<SingleProjectProps> = ({ project }) => {
  return <SingleProject project={project} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connect()

  const project = (await Project.findOne({
    _id: context.params!.projectId,
  })) as IProject

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
  }
}

export default AdminSingleProjectPage
