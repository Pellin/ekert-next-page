import Image from 'next/image'
import React, { useContext, useRef, useState } from 'react'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import VideoCard from './VideoCard'
import styles from './VideoList.module.scss'

const VideoList = () => {
  const { videos } = useContext(AdminContext)!

  return (
    <ul className={styles.videoList}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </ul>
  )
}

export default VideoList
