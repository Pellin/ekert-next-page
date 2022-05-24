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
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      API.getImagesFromDB().then((fetchedImages) => {
        if (fetchedImages) setImages(fetchedImages)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      API.getVideosFromDB().then((fetchedVideos) => {
        if (fetchedVideos) setVideos(fetchedVideos)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const openLightbox = (file: IFile) => {
    setCurrentFile(file)
    setShowLightbox(true)
  }

  const createEmptyProject = async (payload: EmptyProjectPayload) => {
    try {
      const savedProject = await API.saveProjectToDB(payload)
      setProjects((prev) => [...prev, savedProject])
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
      await API.deleteImage(title)
      setImages((prev) => [...prev.filter((image) => image.title !== title)])

      return true
    } catch (error) {
      return false
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
    addFilesToProject,
    removeFilesFromProject,
    toggleFilePublic,
    deleteImage,
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
