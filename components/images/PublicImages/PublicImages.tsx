import Image from 'next/image'
import React, { SyntheticEvent } from 'react'
import { IImage } from '../../../globalTypes'
import PublicImage from './components/PublicImage'
import styles from './PublicImages.module.scss'

const PublicImages = ({ images }: { images: IImage[] }) => {
  const getDimensions = (e: SyntheticEvent<HTMLImageElement>) => {
    console.log(e.currentTarget.naturalHeight)
  }
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
