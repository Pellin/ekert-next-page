import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
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
      // write as API function
      axios
        .get('/api/admin/projects')
        .then((response: AxiosResponse<IProject[]>) => {
          const fetchedProjects = response.data

          setProjects(fetchedProjects)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      // write as API function
      axios
        .get('/api/admin/images')
        .then((response: AxiosResponse<IImage[]>) => {
          const fetchedImages = response.data

          setImages(fetchedImages)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const createEmptyProject = async (payload: EmptyProjectPayload) => {
    try {
      const savedProject = await API.saveProjectToDatabase(payload)
      setProjects((prev) => [...prev, savedProject])
    } catch (error) {
      console.log(error)
    }
  }

  const deleteImage = async (id: string): Promise<boolean> => {
    try {
      const success = await API.deleteImageFromDB(id)
      console.log(success)

      if (success) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const adminContext: AdminContextInterface = {
    images,
    videos,
    projects,
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
