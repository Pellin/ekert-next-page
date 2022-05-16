import React from 'react'
import ImageSection from '../ImageSection'
import ImageModal from '../ImageSection/Lightbox'
import ProjectSection from '../ProjectSection'
import UploadSection from '../UploadSection/UploadSection'
import styles from './AdminContent.module.scss'

const AdminContent = () => {
  return (
    <div className={styles.adminContent}>
      <ProjectSection />
      <ImageSection />
      <UploadSection />
    </div>
  )
}

export default AdminContent
