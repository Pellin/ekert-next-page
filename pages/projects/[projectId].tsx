import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

const SingleProjectsPage = (props: { projectId: string }) => {
  return <div>Project Page for project #{props.projectId}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context)

  return {
    props: {
      projectId: context.params!.projectId,
    },
  }
}

export default SingleProjectsPage
