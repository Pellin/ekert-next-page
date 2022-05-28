import React, { useEffect, useState } from 'react'
import * as API from './api'
import {
  FCProps,
  IImage,
  IProject,
  IFile,
  IVideo,
  FileType,
} from '../../globalTypes'
import { AdminContextInterface, EmptyProjectPayload } from './types'
import { getFileType } from '../../aws/helpers'

export const AdminContext = React.createContext<AdminContextInterface | null>(
  null
)

const AdminContextProvider = (props: FCProps) => {
  const [images, setImages] = useState<IImage[]>([])
  const [videos, setVideos] = useState<IVideo[]>([])
  const [currentFile, setCurrentFile] = useState<IFile | null>(null)
  const [showLightbox, setShowLightbox] = useState(false)
  const [projects, setProjects] = useState<IProject[]>([])

  useEffect(() => {
    try {
      API.getProjectsFromDB().then((fetchedProjects) => {
        if (fetchedProjects) setProjects(fetchedProjects)
      })
    } catch (error) {}
  }, [])

  useEffect(() => {
    try {
      API.getImagesFromDB().then((fetchedImages) => {
        if (fetchedImages) setImages(fetchedImages)
      })
    } catch (error) {}
  }, [])

  useEffect(() => {
    try {
      API.getVideosFromDB().then((fetchedVideos) => {
        if (fetchedVideos) setVideos(fetchedVideos)
      })
    } catch (error) {}
  }, [])

  const openLightbox = (file: IFile) => {
    setCurrentFile(file)
    setShowLightbox(true)
  }

  const createEmptyProject = async (payload: EmptyProjectPayload) => {
    try {
      const response = await API.saveProjectToDB(payload)

      setProjects((prev) => [...prev, response.project])

      return response
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFiles = async (
    inputElement: React.RefObject<HTMLInputElement>
  ) => {
    if (!inputElement.current) return false
    const data = new FormData()
    const filesLength = inputElement.current.files!.length

    for (let i = 0; i < filesLength; i++) {
      data.append('data', inputElement.current.files![i])
    }

    const response = await API.uploadFiles(data)

    const uploadedVideos = response.files.filter((file: IImage | IVideo) =>
      file.title.match(/mov|mp4|mpeg4|wmv|flv|avi/i)
    )

    if (uploadedVideos.length) {
      for (const video of uploadedVideos) {
        const signedUrl = await API.getSignedVideoUrl(video.title)
        video.signedUrl = signedUrl
      }
    }

    const uploadedImages = response.files.filter((file: IImage | IVideo) =>
      file.title.match(/jpeg|jpg|png|gif/i)
    )

    setImages((prev) => [...prev, ...uploadedImages])
    setVideos((prev) => [...prev, ...uploadedVideos])

    return true
  }

  const addFilesToProject = async (
    projectId: string,
    images: string[],
    videos: string[]
  ) => {
    const project = projects.find((proj) => proj._id === projectId)

    if (!project) return false

    if (images.length) {
      project.images.push(...images)
    }

    if (videos.length) {
      project.videos.push(...videos)
    }

    const success = await API.updateProjectInDB(projectId, {
      images: project.images,
      videos: project.videos,
    })

    return success
  }

  const updateProjectTitle = async (
    projectId: string,
    newTitle: string,
    newSlug: string
  ) => {
    const project = projects.find((proj) => proj._id === projectId)

    if (!project) return false

    project.title = newTitle
    project.slug = newSlug

    const success = await API.updateProjectInDB(projectId, {
      title: newTitle,
      slug: newSlug,
    })

    return success
  }

  const updateProjectDescription = async (
    projectId: string,
    newDescription: string
  ) => {
    const project = projects.find((proj) => proj._id === projectId)

    if (!project) return false

    project.description = newDescription

    const success = await API.updateProjectInDB(projectId, {
      description: newDescription,
    })

    return success
  }

  const removeFilesFromProject = async (
    projectId: string,
    images: IImage[],
    videos: IVideo[]
  ) => {
    const project = projects.find((proj) => proj._id === projectId)

    if (!project) return false

    if (images.length) {
      project.images = project.images.filter(
        (imageId) => !images.map((image) => image._id).includes(imageId)
      )
    }

    if (videos.length) {
      project.videos = project.videos.filter(
        (videoId) => !videos.map((video) => video._id).includes(videoId)
      )
    }

    const success = await API.updateProjectInDB(projectId, {
      images: project.images,
      videos: project.videos,
    })

    return success
  }

  const deleteProject = async (projectId: string) => {
    const response = await API.deleteProject(projectId)

    if (response.deleted) {
      setProjects((prev) => [
        ...prev.filter((project) => project._id !== projectId),
      ])
    }

    return response.success as boolean
  }

  const toggleFilePublic = async (file: IFile) => {
    if (file.public) {
      file.public = false
    } else {
      file.public = true
    }

    // @ts-ignore
    if (file.signedUrl) {
      await API.updateFileInDB(file._id!, FileType.VIDEO, {
        public: file.public,
      })
    } else {
      await API.updateFileInDB(file._id!, FileType.IMAGE, {
        public: file.public,
      })
    }
  }

  const deleteImage = async (title: string): Promise<boolean> => {
    try {
      const image = images.find((image) => image.title === title)
      if (!image) return false

      await API.deleteImage(title)
      setImages((prev) => [...prev.filter((image) => image.title !== title)])

      await deleteFileFromAssociatedProjects(image)

      return true
    } catch (error) {
      return false
    }
  }

  const deleteVideo = async (title: string): Promise<boolean> => {
    try {
      const video = videos.find((video) => video.title === title)
      if (!video) return false

      await API.deleteVideo(title)
      setVideos((prev) => [...prev.filter((video) => video.title !== title)])

      await deleteFileFromAssociatedProjects(video)

      return true
    } catch (error) {
      return false
    }
  }

  const deleteFileFromAssociatedProjects = async (file: IFile) => {
    const associatedProjects = projects.filter((project) =>
      project.images.includes(file._id!)
    )

    for (const project of associatedProjects) {
      //@ts-ignore
      if (file.signedUrl) {
        await removeFilesFromProject(project._id!, [], [file])
      } else {
        await removeFilesFromProject(project._id!, [file], [])
      }
    }
  }

  const refreshVideoUrl = async (title: string) => {
    const url = await API.getSignedVideoUrl(title)

    return url
  }

  const adminContext: AdminContextInterface = {
    images,
    videos,
    projects,
    uploadFiles,
    createEmptyProject,
    updateProjectTitle,
    updateProjectDescription,
    addFilesToProject,
    removeFilesFromProject,
    deleteProject,
    toggleFilePublic,
    deleteImage,
    deleteVideo,
    setImages,
    setVideos,
    refreshVideoUrl,
    currentFile,
    setCurrentFile,
    showLightbox,
    setShowLightbox,
    openLightbox,
  }

  return (
    <AdminContext.Provider value={adminContext}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
