import axios from 'axios'
import { EmptyProjectPayload } from './types'

export const saveProjectToDatabase = async (payload: EmptyProjectPayload) => {
  const response = await axios.post('/api/admin/projects', {
    ...payload,
  })

  return response.data
}

export const deleteImageFromDB = async (id: string) => {
  const response = await axios.delete('/api/admin/images', {
    data: {
      id,
    },
  })

  return response.data
}
