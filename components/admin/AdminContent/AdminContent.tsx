import React from 'react'
import ImageSection from '../ImageSection'
import ProjectSection from '../ProjectSection'
import UploadSection from '../UploadSection/UploadSection'
import VideoSection from '../VideoSection'
import styles from './AdminContent.module.scss'

const AdminContent = () => {
  return (
    <div className={styles.adminContent}>
      <UploadSection />
      <ProjectSection />
      <ImageSection />
      <VideoSection />
    </div>
  )
}

export default AdminContent
