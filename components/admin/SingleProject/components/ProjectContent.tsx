import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ProjectFileCard from './ProjectFileCard'
import Button from '../../../ui/Button'
import { IImage, IVideo, FileType } from '../../../../globalTypes'
import styles from '../SingleProject.module.scss'

type ProjectContentProps = {
  disable: boolean
  images: IImage[]
  videos: IVideo[]
  showRemoveContent?: boolean
  setShowRemoveContent: React.Dispatch<React.SetStateAction<boolean>>
  selectedFiles: string[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>
}

const ProjectContent = ({
  disable,
  images,
  videos,
  showRemoveContent,
  setShowRemoveContent,
  selectedFiles,
  setSelectedFiles,
}: ProjectContentProps) => {
  const handleRemoveFiles = () => {
    const selectedImages = images
      .filter((image) => selectedFiles.includes(image._id!))
      .map((image) => image._id!)
    const selectedVideos = videos
      .filter((video) => selectedFiles.includes(video._id!))
      .map((video) => video._id!)

    console.log(selectedImages)
    console.log(selectedVideos)

    // addFiles(selectedImages, selectedVideos)
  }

  const handleClose = () => {
    setSelectedFiles([])
    setShowRemoveContent(false)
  }

  return (
    <section
      className={`${styles.contentWrapper} ${disable && styles.disabled}`}
    >
      {showRemoveContent && (
        <div className={styles.removeContentHeader}>
          {selectedFiles.length ? (
            <div className={styles.saveFilesWrapper}>
              <Button
                onClick={handleRemoveFiles}
                title="Ta bort filer"
                text="Ta bort filer"
                icon={{ name: 'trash-icon.png', alt: 'Släng' }}
              />
            </div>
          ) : (
            <p>Välj filer att ta bort</p>
          )}
          <div
            className={styles.closeIconWrapper}
            onClick={handleClose}
            title="Avbryt"
          >
            <Image
              src="/icons/close-icon-black.png"
              alt="Avbryt"
              height={14}
              width={14}
              layout="responsive"
            />
          </div>
        </div>
      )}
      <ul className={styles.imageList}>
        {images.map((image) => (
          <ProjectFileCard
            fileType={FileType.IMAGE}
            disable={disable}
            key={image._id}
            file={image}
            showRemoveContent={showRemoveContent!}
            selected={selectedFiles}
            setSelected={setSelectedFiles}
          />
        ))}
      </ul>
      <ul className={styles.videoList}>
        {videos.map((video) => (
          <ProjectFileCard
            fileType={FileType.VIDEO}
            disable={disable}
            key={video._id}
            file={video}
            showRemoveContent={showRemoveContent!}
            selected={selectedFiles}
            setSelected={setSelectedFiles}
          />
        ))}
      </ul>
    </section>
  )
}

export default ProjectContent
