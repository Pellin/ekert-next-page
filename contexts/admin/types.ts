import { IProject, IImage, IVideo } from '../../globalTypes'

export interface AdminContextInterface {
  images: IImage[]
  videos: IVideo[]
  projects: IProject[]
  uploadFiles: (
    inputElement: React.RefObject<HTMLInputElement>
  ) => Promise<boolean>
  createEmptyProject: (payload: EmptyProjectPayload) => Promise<void>
  addFilesToProject: (
    projectId: string,
    images: string[],
    videos: string[]
  ) => Promise<boolean>
  deleteImage: (title: string) => Promise<boolean>
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>
  setVideos: React.Dispatch<React.SetStateAction<IVideo[]>>
  refreshVideoUrl: (title: string) => Promise<string>
}

export type EmptyProjectPayload = {
  title: string
  description: string
  isProtected: boolean
}

export type ProjectUpdate = {
  images?: string[]
  videos?: string[]
  title?: string
  slug?: string
  description?: string
  isProtected?: boolean
  password?: string
}
