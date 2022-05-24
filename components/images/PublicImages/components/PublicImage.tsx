import React, { SyntheticEvent, useState } from 'react'
import Image from 'next/image'
import styles from '../PublicImages.module.scss'
import { IImage } from '../../../../globalTypes'

const PublicImage = ({ image }: { image: IImage }) => {
  const [naturalHeight, setNaturalHeight] = useState(400)
  const [naturalWidth, setNaturalWidth] = useState(400)

  const getDimensions = (e: SyntheticEvent<HTMLImageElement>) => {
    setNaturalHeight(e.currentTarget.naturalHeight)
    setNaturalWidth(e.currentTarget.naturalWidth)
  }

  return (
    <li className={styles.imageWrapper} key={image._id}>
      <Image
        alt={image.title}
        className={styles.image}
        height={naturalHeight}
        layout="responsive"
        objectFit="contain"
        onLoad={(e) => getDimensions(e)}
        src={image.url}
        width={naturalWidth}
      />
    </li>
  )
}

export default PublicImage
