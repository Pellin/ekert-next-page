import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { AdminContext } from '../../../contexts/admin/AdminContext'
import { IImage, IVideo, IProject } from '../../../globalTypes'
import styles from './Lightbox.module.scss'

const Lightbox = () => {
  const {
    projects,
    removeFilesFromProject,
    currentFile,
    showLightbox,
    setShowLightbox,
    toggleFilePublic,
  } = useContext(AdminContext)!
  const [associatedProjects, setAssociatedProjects] = useState<IProject[]>([])
  const [naturalHeight, setNaturalHeight] = useState(400)
  const [naturalWidth, setNaturalWidth] = useState(400)
  const [isLandscape, setIsLandscape] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setAssociatedProjects(
      projects.filter(
        (project) =>
          project.images.includes(currentFile?._id!) ||
          project.videos.includes(currentFile?._id!)
      )
    )
  }, [projects, currentFile?._id!])

  const getDimensions = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsLandscape(e.currentTarget.naturalWidth > e.currentTarget.naturalHeight)
    setNaturalHeight(e.currentTarget.naturalHeight)
    setNaturalWidth(e.currentTarget.naturalWidth)
  }

  if (!currentFile) return null

  const fileSize = `${(
    currentFile.size / (currentFile.size > 1000000 ? 1000000 : 1000)
  ).toFixed(1)} ${currentFile.size > 1000000 ? 'MB' : 'KB'}`

  // @ts-ignore
  const isImage = !currentFile.signedUrl

  const handleRemoveFileFromProject = async (projectId: string) => {
    setAssociatedProjects((prev) =>
      prev.filter((project) => project._id !== projectId)
    )

    if (isImage) {
      await removeFilesFromProject(projectId, [currentFile as IImage], [])
    } else {
      await removeFilesFromProject(projectId, [], [currentFile as IVideo])
    }
  }

  const handleTogglePublic = async () => {
    setIsUpdating(true)

    await toggleFilePublic(currentFile)

    setIsUpdating(false)
  }

  return (
    <div className={showLightbox ? styles.lightbox : styles.hidden}>
      <aside className={styles.infoBox}>
        <h2>{currentFile.title}</h2>
        <h4>{fileSize}</h4>
        <h3>I projekt:</h3>
        {associatedProjects.length ? (
          <ul className={styles.associatedProjects}>
            {associatedProjects.map((project) => (
              <li className={styles.projectRow} key={project._id}>
                <p>{project.title}</p>
                <div
                  onClick={
                    isUpdating
                      ? () => {}
                      : () => handleRemoveFileFromProject(project._id!)
                  }
                  title="Ta bort från projekt"
                  className={styles.minusIconWrapper}
                >
                  <Image
                    src="/icons/circle-minus-icon-white.png"
                    alt="Ta bort från projekt"
                    height={14}
                    width={14}
                    layout="responsive"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga associerade projekt</p>
        )}
        <div className={styles.actions}>
          <div
            className={styles.eyeIconWrapper}
            onClick={handleTogglePublic}
            title={currentFile.public ? 'Gör privat' : 'Gör offentlig'}
          >
            <Image
              src={
                currentFile.public
                  ? '/icons/eye-open-icon-white.png'
                  : '/icons/eye-closed-icon-white.png'
              }
              alt={currentFile.public ? 'Gör privat' : 'Gör offentlig'}
              width={24}
              height={20}
            />
          </div>
        </div>
      </aside>
      {isImage ? (
        <article className={styles.imageContainer}>
          <div
            className={styles.imageWrapper}
            style={isLandscape ? { width: '75%' } : { width: '50%' }}
          >
            <Image
              alt={currentFile.title}
              height={naturalHeight}
              layout="responsive"
              onLoad={(e) => getDimensions(e)}
              src={currentFile.url}
              width={naturalWidth}
            />
          </div>
        </article>
      ) : (
        <div className={styles.videoContainer}>
          {/*// @ts-ignore */}
          <video controls src={currentFile.signedUrl} />
        </div>
      )}
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
