import React from 'react'
import { signOut } from 'next-auth/react'
import AdminContextProvider from '../../../contexts/admin/AdminContext'
import ImageSection from '../ImageSection'
import ProjectSection from '../ProjectSection'
import UploadSection from '../UploadSection/UploadSection'
import VideoSection from '../VideoSection'
import Lightbox from '../Lightbox'
import Button from '../../ui/Button'
import styles from './AdminContent.module.scss'

const AdminContent = () => {
  const handleLogout = () => {
    signOut()
  }

  return (
    <AdminContextProvider>
      <div className={styles.adminContent}>
        <Button
          backgroundColor="#F78C79"
          color="#fff"
          text="Logga ut"
          title="Logga ut"
          onClick={() => handleLogout()}
        />
        <UploadSection />
        <ProjectSection />
        <ImageSection />
        <VideoSection />
        <Lightbox />
      </div>
    </AdminContextProvider>
  )
}

export default AdminContent
