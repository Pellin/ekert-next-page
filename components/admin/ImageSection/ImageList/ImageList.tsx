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
        <li key={image._id}>
          <div
            onClick={() => handleOpenLightbox(image)}
            title="Öppna bild"
            className={styles.thumbnailWrapper}
          >
            <Image
              className={styles.img}
              src={image.thumbnail}
              alt={image.title}
              width={200}
              height={200}
              objectFit="cover"
            />
          </div>
          <div className={styles.imageOptions}>
            <div
              onClick={() => handleDeleteImage(image.title)}
              title="Släng"
              className={styles.iconWrapper}
            >
              <Image
                src="/icons/trash.png"
                alt="Delete"
                width={40}
                height={40}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ImageList
