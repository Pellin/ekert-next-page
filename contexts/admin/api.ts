import axios, { AxiosResponse } from 'axios'
import { IImage, IProject, IVideo } from '../../globalTypes'
import { EmptyProjectPayload } from './types'

export const getProjectsFromDB = async () => {
  try {
    const response: AxiosResponse<IProject[]> = await axios.get(
      '/api/admin/projects'
    )

    return response.data
  } catch (error) {
    return false
  }
}

export const saveProjectToDB = async (payload: EmptyProjectPayload) => {
  const response = await axios.post('/api/admin/projects', {
    ...payload,
  })

  return response.data
}

export const uploadFiles = async (data: FormData) => {
  const response: AxiosResponse<any> = await axios.post(
    '/api/admin/upload',
    data,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export const getImagesFromDB = async () => {
  try {
    const response: AxiosResponse<IImage[]> = await axios.get(
      '/api/admin/images'
    )

    return response.data
  } catch (error) {
    return false
  }
}

export const deleteImage = async (title: string) => {
  const response = await axios.delete('/api/admin/images', {
    data: {
      title,
    },
  })

  return response.data
}

export const getVideosFromDB = async () => {
  try {
    const response: AxiosResponse<IVideo[]> = await axios.get(
      '/api/admin/videos'
    )

    for (const video of response.data) {
      const response: AxiosResponse<string> = await axios.get(
        `/api/admin/videos/${video.title}`
      )

      video.signedUrl = response.data
    }

    return response.data
  } catch (error) {
    return false
  }
}
