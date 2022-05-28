import { FileType, IFile, IImage, IProject, IVideo } from '../../../globalTypes'

export type AddContentProps = {
  images: IImage[]
  videos: IVideo[]
  project: IProject
  addFiles: (images: string[], videos: string[]) => void
  selectedFiles: string[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>
  showAddContent: boolean
  setShowAddContent: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProjectContentProps = {
  project: IProject
  disable: boolean
  isEmpty: boolean
  images: IImage[]
  videos: IVideo[]
  setProjectImages: React.Dispatch<React.SetStateAction<IImage[]>>
  setProjectVideos: React.Dispatch<React.SetStateAction<IVideo[]>>
  showRemoveContent?: boolean
  setShowRemoveContent: React.Dispatch<React.SetStateAction<boolean>>
  selectedFiles: string[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>
}

export type ProjectFileCardProps = {
  add?: boolean
  disable?: boolean
  file: IFile
  fileType: FileType
  selected?: string[]
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>
  showRemoveContent?: boolean
  showAddContent?: boolean
}

export type ProjectHeaderProps = {
  project: IProject
  showAddContent: boolean
  setShowAddContent: React.Dispatch<React.SetStateAction<boolean>>
  showDeleteModal: boolean
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  showRemoveContent: boolean
  setShowRemoveContent: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedToAdd: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedToRemove: React.Dispatch<React.SetStateAction<string[]>>
}
