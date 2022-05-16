import { IProject, IImage, IVideo } from '../../globalTypes'

export interface AdminContextInterface {
  images: IImage[]
  videos: IVideo[]
  projects: IProject[]
  uploadFiles: (
    inputElement: React.RefObject<HTMLInputElement>
  ) => Promise<boolean>
  createEmptyProject: (payload: EmptyProjectPayload) => Promise<void>
  deleteImage: (title: string) => Promise<boolean>
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>
  setVideos: React.Dispatch<React.SetStateAction<IVideo[]>>
}

export type EmptyProjectPayload = {
  title: string
  description: string
  isProtected: boolean
}
