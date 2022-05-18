import React from 'react'
import { IImage } from '../../../../globalTypes'
import styles from './ImageList.module.scss'
import ImageCard from './components/ImageCard'

type ImageListProps = {
  images: IImage[]
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentImage: React.Dispatch<React.SetStateAction<IImage | null>>
}

const ImageList = ({
  images,
  setShowLightbox,
  setCurrentImage,
}: ImageListProps) => {
  const handleOpenLightbox = (image: IImage) => {
    setCurrentImage(image)
    setShowLightbox(true)
  }

  return (
    <ul className={styles.imageGrid}>
      {images.map((image) => (
        <ImageCard
          key={image._id}
          image={image}
          openLightbox={handleOpenLightbox}
        />
      ))}
    </ul>
  )
}

export default ImageList
