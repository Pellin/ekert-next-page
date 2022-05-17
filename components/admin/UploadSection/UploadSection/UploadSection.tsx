import React from 'react'
import UploadForm from '../UploadForm'
import styles from '../../AdminContent/AdminContent.module.scss'

const UploadSection = () => {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2>Ladda upp filer</h2>
      </div>
      <div className={styles.empty}></div>
      <UploadForm />
    </section>
  )
}

export default UploadSection
