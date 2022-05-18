import React from 'react'
import Image from 'next/image'
import VideoList from './VideoList'
import styles from '../AdminContent/AdminContent.module.scss'

const VideoSection = () => {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <div className={styles.iconWrapper}>
          <Image
            src={'/icons/video-icon.png'}
            alt="Projekt"
            width={26}
            height={20}
          />
        </div>
        <h2>Video</h2>
      </div>
      <div className={styles.empty}></div>
      <VideoList />
    </section>
  )
}

export default VideoSection
