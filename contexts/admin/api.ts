import axios, { AxiosResponse } from 'axios'
import { FileData, IImage, IProject } from '../../globalTypes'
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
