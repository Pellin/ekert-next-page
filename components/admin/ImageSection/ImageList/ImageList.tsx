import React, { useContext } from 'react'
import ImageCard from './components/ImageCard'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import styles from './ImageList.module.scss'

const ImageList = () => {
  const { images } = useContext(AdminContext)!

  return (
    <ul className={styles.imageGrid}>
      {images.map((image) => (
        <ImageCard key={image._id} image={image} />
      ))}
    </ul>
  )
}

export default ImageList
