import React from 'react'
import Image from 'next/image'
import ImageList from './ImageList'
import styles from '../../admin/AdminContent/AdminContent.module.scss'

const ImageSection = () => {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <div className={styles.iconWrapper}>
          <Image
            src={'/icons/image-icon.png'}
            alt="Bilder"
            width={24}
            height={20}
          />
        </div>
        <h2>Bilder</h2>
      </div>
      <div className={styles.empty}></div>
      <ImageList />
    </section>
  )
}

export default ImageSection
