import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { IProject } from '../../../globalTypes'
import Project from '../../../db/models/Project'
import connect from '../../../db/connect'
import SingleProject from '../../../components/admin/SingleProject'
import { getSession } from 'next-auth/react'

type SingleProjectProps = {
  project: IProject
}

const AdminSingleProjectPage: NextPage<SingleProjectProps> = ({ project }) => {
  return <SingleProject project={project} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  await connect()

  const project = (await Project.findOne({
    slug: context.params!.slug,
  })) as IProject

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
      session,
    },
  }
}

export default AdminSingleProjectPage
