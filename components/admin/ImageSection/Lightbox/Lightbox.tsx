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
  const [naturalWidth, setNaturalWidth] = useState(300)
  const [naturalHeight, setNaturalHeight] = useState(250)
  const [dimensions, setDimension] = useState({
    width: `${naturalWidth}px`,
    height: `${naturalHeight}px`,
  })

  const handleOnLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    // @ts-ignore
    const imageWidth = e.target.naturalWidth
    // @ts-ignore
    const imageHeight = e.target.naturalHeight

    calculateWidthAndHeight(imageHeight, imageWidth)
  }

  const calculateWidthAndHeight = (h: number, w: number) => {
    console.log(h)
    console.log(w)

    setNaturalHeight(h)
    setNaturalWidth(w)
  }

  return (
    <div className={visible ? styles.lightbox : styles.hidden}>
      <div
        className={styles.imageWrapper}
        style={{ width: `${naturalWidth}px`, height: `${naturalHeight}px` }}
      >
        {image && (
          <Image
            onLoad={(e) => handleOnLoad(e)}
            layout="responsive"
            sizes="90vw"
            src={image.url}
            alt={image.title}
            width={naturalWidth}
            height={naturalHeight}
          />
        )}
      </div>
      <div
        onClick={() => setShowLightbox(false)}
        className={styles.iconWrapper}
      >
        <Image
          src="/icons/close-icon.png"
          alt="close-icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  )
}

export default Lightbox
