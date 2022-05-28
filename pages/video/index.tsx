import React from 'react'
import { GetStaticProps } from 'next'
import { getSignedVideoUrl } from '../../aws/helpers'
import connect from '../../db/connect'
import Video from '../../db/models/Video'
import PublicVideos from '../../components/videos/PublicVideos'
import { IVideo } from '../../globalTypes'

const VideoPage = ({ videos }: { videos: IVideo[] }) => {
  return <PublicVideos videos={videos} />
}

export const getStaticProps: GetStaticProps = async () => {
  await connect()

  const response = await Video.find()

  const videos = JSON.parse(JSON.stringify(response)) as IVideo[]

  for (const video of videos) {
    if (video.public) {
      const key = `test/videos/${video.title}`
      const signedUrl = await getSignedVideoUrl(key)

      if (signedUrl) {
        video.signedUrl = signedUrl
      }
    }
  }

  return {
    props: {
      videos: videos.filter((video) => video.public),
    },
    revalidate: 60 * 60 * 60,
  }
}

export default VideoPage
