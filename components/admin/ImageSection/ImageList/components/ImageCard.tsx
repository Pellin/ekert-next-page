import React from 'react'
import Image from 'next/image'
import { IImage } from '../../../../../globalTypes'
import styles from '../ImageList.module.scss'

type ImageCardProps = {
  image: IImage
  openLightbox: (image: IImage) => void
}

const ImageCard = ({ image, openLightbox }: ImageCardProps) => {
  return (
    <li className={styles.imageCard} key={image._id}>
      <div className={styles.imageHeader}>
        <p>{image.title}</p>
        <div
          onClick={() => openLightbox(image)}
          title="Inspektera"
          className={styles.iconWrapper}
        >
          <Image
            src="/icons/info-icon.png"
            alt="Delete"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className={styles.thumbnailWrapper}>
        <Image
          layout="responsive"
          className={styles.img}
          src={image.thumbnail}
          alt={image.title}
          width={200}
          height={200}
          objectFit="cover"
        />
      </div>
    </li>
  )
}

export default ImageCard
