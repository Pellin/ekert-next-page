import Image from 'next/image'
import React, { SyntheticEvent, useState } from 'react'
import { IImage } from '../../../../globalTypes'
import styles from './Lightbox.module.scss'

type LightBoxProps = {
  image: IImage | null
  visible: boolean
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>
}

const Lightbox = ({ image, visible, setShowLightbox }: LightBoxProps) => {
  const [naturalHeight, setNaturalHeight] = useState(400)
  const [naturalWidth, setNaturalWidth] = useState(400)
  const [isLandscape, setIsLandscape] = useState(false)

  const getDimensions = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsLandscape(e.currentTarget.naturalWidth > e.currentTarget.naturalHeight)
    setNaturalHeight(e.currentTarget.naturalHeight)
    setNaturalWidth(e.currentTarget.naturalWidth)
  }

  if (!image) return null
  console.log(image.size)

  const imageSize = `${(
    image.size / (image.size > 1000000 ? 1000000 : 1000)
  ).toFixed(1)} ${image.size > 1000000 ? 'MB' : 'KB'}`

  return (
    <div className={visible ? styles.lightbox : styles.hidden}>
      <aside className={styles.infoBox}>
        <h3>{image.title}</h3>
        <h4>{imageSize}</h4>
      </aside>
      <div className={styles.imageContainer}>
        <div
          className={styles.imageWrapper}
          style={isLandscape ? { width: '75%' } : { width: '50%' }}
        >
          <Image
            alt={image.title}
            height={naturalHeight}
            layout="responsive"
            onLoad={(e) => getDimensions(e)}
            src={image.url}
            width={naturalWidth}
          />
        </div>
      </div>
      <div
        onClick={() => setShowLightbox(false)}
        className={styles.iconWrapper}
      >
        <Image
          alt="close-icon"
          height={20}
          src="/icons/close-icon.png"
          width={20}
        />
      </div>
    </div>
  )
}

export default Lightbox
