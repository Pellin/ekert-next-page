import React from 'react'
import VideoList from './VideoList'
import styles from '../AdminContent/AdminContent.module.scss'

const VideoSection = () => {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2>Video</h2>
      </div>
      <div className={styles.empty}></div>
      <VideoList />
    </section>
  )
}

export default VideoSection
