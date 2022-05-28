import { IProject, IImage, IVideo, IFile } from '../../globalTypes'

export interface AdminContextInterface {
  images: IImage[]
  videos: IVideo[]
  projects: IProject[]
  uploadFiles: (
    inputElement: React.RefObject<HTMLInputElement>
  ) => Promise<boolean>
  createEmptyProject: (
    payload: EmptyProjectPayload
  ) => Promise<{ project: IProject; password: string }>
  addFilesToProject: (
    projectId: string,
    images: string[],
    videos: string[]
  ) => Promise<boolean>
  removeFilesFromProject: (
    projectId: string,
    images: IImage[],
    videos: IVideo[]
  ) => Promise<boolean>
  updateProjectTitle: (
    projectId: string,
    newTitle: string,
    newSlug: string
  ) => Promise<boolean>
  updateProjectDescription: (
    projectId: string,
    newDescription: string
  ) => Promise<boolean>
  deleteProject: (projectId: string) => Promise<boolean>
  toggleFilePublic: (file: IFile) => Promise<void>
  deleteImage: (title: string) => Promise<boolean>
  deleteVideo: (title: string) => Promise<boolean>
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>
  setVideos: React.Dispatch<React.SetStateAction<IVideo[]>>
  refreshVideoUrl: (title: string) => Promise<string>
  openLightbox: (file: IFile) => void
  currentFile: IFile | null
  setCurrentFile: React.Dispatch<React.SetStateAction<IFile | null>>
  showLightbox: boolean
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>
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

export type FileUpdate = {
  public: boolean
}
