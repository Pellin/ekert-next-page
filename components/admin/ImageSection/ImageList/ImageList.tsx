import React, { useContext } from 'react'
import ImageCard from './components/ImageCard'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import styles from './ImageList.module.scss'

const ImageList = () => {
  const { images } = useContext(AdminContext)!

  return (
    <>
      {images.length ? (
        <ul className={styles.imageGrid}>
          {images.map((image) => (
            <ImageCard key={image._id} image={image} />
          ))}
        </ul>
      ) : (
        <p>Det finns inga uppladdade bilder</p>
      )}
    </>
  )
}

export default ImageList
