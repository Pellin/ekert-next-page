import React, { useContext } from 'react'
import Image from 'next/image'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import Button from '../../../ui/Button'
import ProjectFileCard from './ProjectFileCard'
import { FileType } from '../../../../globalTypes'
import { ProjectContentProps } from '../types.'
import styles from '../SingleProject.module.scss'

const ProjectContent = ({
  project,
  disable,
  isEmpty,
  images,
  videos,
  setProjectImages,
  setProjectVideos,
  showRemoveContent,
  setShowRemoveContent,
  selectedFiles,
  setSelectedFiles,
}: ProjectContentProps) => {
  const { removeFilesFromProject } = useContext(AdminContext)!

  const handleRemoveFiles = async () => {
    const selectedImages = images.filter((image) =>
      selectedFiles.includes(image._id!)
    )

    const selectedVideos = videos.filter((video) =>
      selectedFiles.includes(video._id!)
    )

    await removeFilesFromProject(project._id!, selectedImages, selectedVideos)

    setProjectImages((prev) => [
      ...prev.filter(
        (projectImage) =>
          !selectedImages
            .map((selectedImage) => selectedImage._id!)
            .includes(projectImage._id!)
      ),
    ])
    setProjectVideos((prev) => [
      ...prev.filter(
        (projectVideo) =>
          !selectedVideos
            .map((selectedVideo) => selectedVideo._id!)
            .includes(projectVideo._id!)
      ),
    ])
    setSelectedFiles([])
    setShowRemoveContent(false)
  }

  const handleClose = () => {
    setSelectedFiles([])
    setShowRemoveContent(false)
  }

  return (
    <section
      className={`${styles.contentWrapper} ${disable && styles.disabled} ${
        isEmpty && styles.isEmpty
      }`}
    >
      {showRemoveContent && (
        <div className={styles.removeContentHeader}>
          {selectedFiles.length ? (
            <div className={styles.saveFilesWrapper}>
              <Button
                backgroundColor="#F78C79"
                color="#f5f5f5"
                onClick={handleRemoveFiles}
                title="Ta bort filer"
                text="Ta bort filer"
                icon={{ name: 'trash-icon-white.png', alt: 'Släng' }}
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
      {isEmpty ? (
        <p>
          Det här projektet är tomt. Tryck på{' '}
          <span>
            <Image
              src="/icons/circle-plus-icon.png"
              alt="Plustecken"
              height={20}
              width={20}
              layout="responsive"
              objectFit="contain"
            />
          </span>{' '}
          i menyn för att lägga till bilder eller videor.
        </p>
      ) : (
        <>
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
        </>
      )}
    </section>
  )
}

export default ProjectContent
