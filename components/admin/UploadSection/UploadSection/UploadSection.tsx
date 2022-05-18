import React from 'react'
import UploadForm from '../UploadForm'
import styles from '../../AdminContent/AdminContent.module.scss'
import Image from 'next/image'

const UploadSection = () => {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <div className={`${styles.iconWrapper} ${styles.upload}`}>
          <Image
            src={'/icons/upload-icon.png'}
            alt="Ladda upp"
            width={24}
            height={20}
          />
        </div>
        <h2>Ladda upp filer</h2>
      </div>
      <div className={styles.empty}></div>
      <UploadForm />
    </section>
  )
}

export default UploadSection
