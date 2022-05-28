import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../../contexts/admin/AdminContext'
import BackButton from '../../ui/BackButton'
import ProjectHeader from './components/ProjectHeader'
import AddContent from './components/AddContent'
import ProjectContent from './components/ProjectContent'
import { IImage, IProject, IVideo } from '../../../globalTypes'
import styles from './SingleProject.module.scss'
import Button from '../../ui/Button'

const ConfirmDeleteModal = () => {
  return (
    <dialog className={styles.confirmDeleteModal}>
      <div className={styles.messageBox}>
        <p>Är du säker?</p>
        <div className={styles.buttons}>
          <Button text="Avbryt" title="Avbryt" />
          <Button text="Ja" title="Avbryt" />
        </div>
      </div>
    </dialog>
  )
}

const SingleProject = ({ project }: { project: IProject }) => {
  const { images, videos, addFilesToProject } = useContext(AdminContext)!
  const [showAddContent, setShowAddContent] = useState(false)
  const [showRemoveContent, setShowRemoveContent] = useState(false)
  const [selectedToAdd, setSelectedToAdd] = useState<string[]>([])
  const [selectedToRemove, setSelectedToRemove] = useState<string[]>([])
  const [projectImages, setProjectImages] = useState<IImage[]>([])
  const [projectVideos, setProjectVideos] = useState<IVideo[]>([])
  const [isEmpty, setIsEmpty] = useState(
    !project.videos.length && !project.images.length
  )
  const [unselectedImages, setUnselectedImages] = useState<IImage[]>([])
  const [unselectedVideos, setUnselectedVideos] = useState<IVideo[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    setProjectImages(
      images.filter((image) => project.images.includes(image._id!))
    )
    if (project.isProtected) {
      setUnselectedImages(
        images.filter((image) => !project.images.includes(image._id!))
      )
    } else {
      setUnselectedImages(
        images.filter(
          (image) => !project.images.includes(image._id!) && image.public
        )
      )
    }
    setProjectVideos(
      videos.filter((video) => project.videos.includes(video._id!))
    )

    if (project.isProtected) {
      setUnselectedVideos(
        videos.filter((video) => !project.videos.includes(video._id!))
      )
    } else {
      setUnselectedVideos(
        videos.filter(
          (video) => !project.videos.includes(video._id!) && video.public
        )
      )
    }
  }, [project, images, videos])

  useEffect(() => {
    if (!projectVideos.length && !projectImages.length) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }, [projectVideos, projectImages])

  const handleAddFiles = async (imageIds: string[], videoIds: string[]) => {
    const addedImages = images.filter((image) => imageIds.includes(image._id!))
    const addedVideos = videos.filter((video) => videoIds.includes(video._id!))

    setProjectImages((prev) => [...prev, ...addedImages])
    setProjectVideos((prev) => [...prev, ...addedVideos])
    setUnselectedImages((prev) => [
      ...prev.filter((image) => !imageIds.includes(image._id!)),
    ])
    setUnselectedVideos((prev) => [
      ...prev.filter((video) => !videoIds.includes(video._id!)),
    ])

    await addFilesToProject(project._id!, imageIds, videoIds)

    setShowAddContent(false)
  }

  return (
    <div className={styles.projectContainer}>
      <BackButton />
      <ProjectHeader
        project={project}
        showAddContent={showAddContent}
        showRemoveContent={showRemoveContent}
        setShowAddContent={setShowAddContent}
        setShowRemoveContent={setShowRemoveContent}
        setSelectedToAdd={setSelectedToAdd}
        setSelectedToRemove={setSelectedToRemove}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />
      {showAddContent && (
        <AddContent
          project={project}
          images={unselectedImages}
          videos={unselectedVideos}
          addFiles={handleAddFiles}
          selectedFiles={selectedToAdd}
          setSelectedFiles={setSelectedToAdd}
          showAddContent={showAddContent}
          setShowAddContent={setShowAddContent}
        />
      )}
      <ProjectContent
        project={project}
        disable={showAddContent}
        isEmpty={isEmpty}
        images={projectImages}
        videos={projectVideos}
        setProjectImages={setProjectImages}
        setProjectVideos={setProjectVideos}
        showRemoveContent={showRemoveContent}
        setShowRemoveContent={setShowRemoveContent}
        selectedFiles={selectedToRemove}
        setSelectedFiles={setSelectedToRemove}
      />
      {showDeleteModal && <ConfirmDeleteModal />}
    </div>
  )
}

export default SingleProject
