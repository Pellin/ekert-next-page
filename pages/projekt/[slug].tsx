import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getSignedVideoUrl } from '../../aws/helpers'
import connect from '../../db/connect'
import Project from '../../db/models/Project'
import Image from '../../db/models/Image'
import SingleProject from '../../components/projects/SingleProject'
import { IImage, IVideo, IProject, SingleProjectProps } from '../../globalTypes'
import Video from '../../db/models/Video'

const SingleProjectPage = ({ project, videos, images }: SingleProjectProps) => {
  return <SingleProject images={images} videos={videos} project={project} />
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

  const imageResponse = await Image.find()
  const images = JSON.parse(JSON.stringify(imageResponse)) as IImage[]
  const videoResponse = await Video.find()
  const videos = JSON.parse(JSON.stringify(videoResponse)) as IVideo[]
  const filteredVideos = videos.filter((video) =>
    project.videos.includes(video._id!)
  )

  for (const video of filteredVideos) {
    const signedUrl = await getSignedVideoUrl(`test/videos/${video.title}`)
    if (signedUrl) {
      video.signedUrl = signedUrl
    }
  }

  return {
    props: {
      project,
      images: images.filter((image) => project.images.includes(image._id!)),
      videos: filteredVideos,
    },
    revalidate: 60 * 60,
  }
}

export default SingleProjectPage
