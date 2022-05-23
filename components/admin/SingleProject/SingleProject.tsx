import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../../contexts/admin/AdminContext'
import BackButton from '../../ui/BackButton'
import ProjectHeader from './components/ProjectHeader'
import AddContent from './components/AddContent'
import ProjectContent from './components/ProjectContent'
import { IImage, IProject, IVideo } from '../../../globalTypes'
import styles from './SingleProject.module.scss'

const SingleProject = ({ project }: { project: IProject }) => {
  const { images, videos, addFilesToProject } = useContext(AdminContext)!
  const [showAddContent, setShowAddContent] = useState(false)
  const [showRemoveContent, setShowRemoveContent] = useState(false)
  const [selectedToAdd, setSelectedToAdd] = useState<string[]>([])
  const [selectedToRemove, setSelectedToRemove] = useState<string[]>([])
  const [projectImages, setProjectImages] = useState<IImage[]>([])
  const [projectVideos, setProjectVideos] = useState<IVideo[]>([])
  const [unselectedImages, setUnselectedImages] = useState<IImage[]>([])
  const [unselectedVideos, setUnselectedVideos] = useState<IVideo[]>([])

  useEffect(() => {
    setProjectImages(
      images.filter((image) => project.images.includes(image._id!))
    )
    setUnselectedImages(
      images.filter((image) => !project.images.includes(image._id!))
    )
    setProjectVideos(
      videos.filter((video) => project.videos.includes(video._id!))
    )
    setUnselectedVideos(
      videos.filter((video) => !project.videos.includes(video._id!))
    )
  }, [project, images, videos])

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

    const success = await addFilesToProject(project._id!, imageIds, videoIds)
    console.log(success)

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
        disable={showAddContent}
        images={projectImages}
        showRemoveContent={showRemoveContent}
        videos={projectVideos}
        setShowRemoveContent={setShowRemoveContent}
        selectedFiles={selectedToRemove}
        setSelectedFiles={setSelectedToRemove}
      />
    </div>
  )
}

export default SingleProject