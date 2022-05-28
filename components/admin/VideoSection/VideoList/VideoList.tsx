import React, { useContext } from 'react'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import VideoCard from './VideoCard'
import styles from './VideoList.module.scss'

const VideoList = () => {
  const { videos } = useContext(AdminContext)!

  return (
    <>
      {videos.length ? (
        <ul className={styles.videoList}>
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </ul>
      ) : (
        <p>Det finns inga uppladdade videor</p>
      )}
    </>
  )
}

export default VideoList
