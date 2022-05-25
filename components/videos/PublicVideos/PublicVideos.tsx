import React from 'react'
import { IVideo } from '../../../globalTypes'
import styles from './PublicVideos.module.scss'

const PublicVideos = ({ videos }: { videos: IVideo[] }) => {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.videoList}>
        {videos.map((video) => (
          <li key={video._id}>
            <div className={styles.videoContainer}>
              <video controls src={video.signedUrl} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PublicVideos
