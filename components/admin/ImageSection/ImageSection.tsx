import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { AdminContext } from '../../../contexts/admin/AdminContext'
import ImageList from './ImageList'
import Lightbox from './Lightbox'
import { IImage } from '../../../globalTypes'
import styles from '../../admin/AdminContent/AdminContent.module.scss'

const ImageSection = () => {
  const { images } = useContext(AdminContext)!
  const [showLightbox, setShowLightbox] = useState(false)
  const [currentImage, setCurrentImage] = useState<IImage | null>(null)

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
      <ImageList
        setCurrentImage={setCurrentImage}
        setShowLightbox={setShowLightbox}
        images={images}
      />
      <Lightbox
        setShowLightbox={setShowLightbox}
        visible={showLightbox}
        image={currentImage!}
      />
    </section>
  )
}

export default ImageSection
