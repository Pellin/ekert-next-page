import React, { useContext } from 'react'
import Image from 'next/image'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import { IImage } from '../../../../globalTypes'
import styles from './ImageList.module.scss'

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
  const { deleteImage } = useContext(AdminContext)!

  const handleDeleteImage = async (title: string) => {
    const success = await deleteImage(title)

    if (success) {
      console.log('YEAH')
    } else {
      console.log('NOPE')
    }
  }

  const handleOpenLightbox = (image: IImage) => {
    setCurrentImage(image)
    setShowLightbox(true)
  }

  return (
    <ul className={styles.imageGrid}>
      {images.map((image) => (
        <li className={styles.imageCard} key={image._id}>
          <div className={styles.imageHeader}>
            <p>{image.title}</p>
            <div
              onClick={() => handleOpenLightbox(image)}
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
          <div
            // title="Öppna bild"
            className={styles.thumbnailWrapper}
          >
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
      ))}
    </ul>
  )
}

export default ImageList
