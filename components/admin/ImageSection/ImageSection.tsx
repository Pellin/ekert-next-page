import React, { useContext, useState } from 'react'
import { AdminContext } from '../../../contexts/admin/AdminContext'
import { IImage } from '../../../globalTypes'
import ImageList from './ImageList'
import Lightbox from './Lightbox'
import styles from '../../admin/AdminContent/AdminContent.module.scss'

const ImageSection = () => {
  const { images } = useContext(AdminContext)!
  const [showLightbox, setShowLightbox] = useState(false)
  const [currentImage, setCurrentImage] = useState<IImage | null>(null)

  return (
    <section>
      <div className={styles.sectionHeader}>
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
        image={currentImage}
      />
    </section>
  )
}

export default ImageSection
