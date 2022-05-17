import Image from 'next/image'
import React, { useContext } from 'react'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import styles from './VideoList.module.scss'

const VideoList = () => {
  const { videos } = useContext(AdminContext)!

  return (
    <ul className={styles.videoList}>
      {videos.map((video) => (
        <li key={video._id!} className={styles.videoCard}>
          <div className={styles.cardHeader}>
            <h3>{video.title}</h3>
            <div className={styles.iconWrapper}>
              <Image
                title="Inspektera"
                src="/icons/info-icon.png"
                alt="Inspektera"
                width={16}
                height={16}
              />
            </div>
          </div>
          <video
            onContextMenu={(e) => e.preventDefault()}
            controls
            controlsList="nodownload"
            src={video.signedUrl}
          />
        </li>
      ))}
    </ul>
  )
}

export default VideoList
