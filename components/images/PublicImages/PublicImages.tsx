import React from 'react'
import { IImage } from '../../../globalTypes'
import PublicImage from './components/PublicImage'
import styles from './PublicImages.module.scss'

const PublicImages = ({ images }: { images: IImage[] }) => {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.imageList}>
        {images.map((image) => (
          <PublicImage key={image._id} image={image} />
        ))}
      </ul>
    </div>
  )
}

export default PublicImages
