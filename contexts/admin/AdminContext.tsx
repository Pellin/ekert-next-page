import React, { useEffect, useState } from 'react'
import * as API from './api'
import { FCProps, IImage, IProject, IVideo } from '../../globalTypes'
import { AdminContextInterface, EmptyProjectPayload } from './types'

export const AdminContext = React.createContext<AdminContextInterface | null>(
  null
)

const AdminContextProvider = (props: FCProps) => {
  const [images, setImages] = useState<IImage[]>([])
  const [videos, setVideos] = useState<IVideo[]>([])
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

    // TODO: kolla om video eller image
    setImages((prev) => [...prev, ...response.files])

    return true
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

  const adminContext: AdminContextInterface = {
    images,
    videos,
    projects,
    uploadFiles,
    createEmptyProject,
    deleteImage,
    setImages,
    setVideos,
  }

  return (
    <AdminContext.Provider value={adminContext}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
