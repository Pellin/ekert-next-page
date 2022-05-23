import React, { useState } from 'react'
import Image from 'next/image'
import ProjectFileCard from './ProjectFileCard'
import Button from '../../../ui/Button'
import { FileType, IProject, IImage, IVideo } from '../../../../globalTypes'
import styles from '../SingleProject.module.scss'

type AddContentProps = {
  images: IImage[]
  videos: IVideo[]
  project: IProject
  addFiles: (images: string[], videos: string[]) => void
  selectedFiles: string[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>
  showAddContent: boolean
  setShowAddContent: React.Dispatch<React.SetStateAction<boolean>>
}

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
              onClick={handleAddFiles}
              title="Spara"
              text="Spara"
              icon={{ name: 'circle-plus-icon.png', alt: 'Spara' }}
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
            selected={selectedFiles}
            setSelected={setSelectedFiles}
            add
            key={image._id}
            file={image}
            fileType={FileType.IMAGE}
            showAddContent={showAddContent}
          />
        ))}
      </div>
      <div className={styles.videoList}>
        {videos.map((video) => (
          <ProjectFileCard
            selected={selectedFiles}
            setSelected={setSelectedFiles}
            add
            key={video._id}
            file={video}
            fileType={FileType.VIDEO}
            showAddContent={showAddContent}
          />
        ))}
      </div>
    </section>
  )
}

export default AddContent
