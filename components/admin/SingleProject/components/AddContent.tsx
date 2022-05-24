import React from 'react'
import Image from 'next/image'
import ProjectFileCard from './ProjectFileCard'
import Button from '../../../ui/Button'
import { FileType } from '../../../../globalTypes'
import { AddContentProps } from '../types.'
import styles from '../SingleProject.module.scss'

const AddContent = ({
  images,
  videos,
  addFiles,
  selectedFiles,
  setSelectedFiles,
  showAddContent,
  setShowAddContent,
}: AddContentProps) => {
  const handleAddFiles = () => {
    const selectedImages = images
      .filter((image) => selectedFiles.includes(image._id!))
      .map((image) => image._id!)
    const selectedVideos = videos
      .filter((video) => selectedFiles.includes(video._id!))
      .map((video) => video._id!)

    addFiles(selectedImages, selectedVideos)
  }
  const handleClose = () => {
    setSelectedFiles([])
    setShowAddContent(false)
  }

  return (
    <section className={styles.addContentWrapper}>
      <div className={styles.addContentHeader}>
        {selectedFiles.length ? (
          <div className={styles.saveFilesWrapper}>
            <Button
              backgroundColor="#65aa65"
              color="#f5f5f5"
              onClick={handleAddFiles}
              title="Spara"
              text="Spara"
              icon={{ name: 'circle-plus-icon-white.png', alt: 'Spara' }}
            />
          </div>
        ) : (
          <p>Välj filer att lägga till</p>
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
      <div className={styles.imageList}>
        {images.map((image) => (
          <ProjectFileCard
            key={image._id}
            file={image}
            fileType={FileType.IMAGE}
            selected={selectedFiles}
            setSelected={setSelectedFiles}
            add
            showAddContent={showAddContent}
          />
        ))}
      </div>
      <div className={styles.videoList}>
        {videos.map((video) => (
          <ProjectFileCard
            key={video._id}
            file={video}
            fileType={FileType.VIDEO}
            selected={selectedFiles}
            setSelected={setSelectedFiles}
            add
            showAddContent={showAddContent}
          />
        ))}
      </div>
    </section>
  )
}

export default AddContent
