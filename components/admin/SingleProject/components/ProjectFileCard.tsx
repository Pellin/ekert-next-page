import React, { ReducerWithoutAction, useEffect, useReducer } from 'react'
import Image from 'next/image'
import SelectIcon from './icons/SelectIcon'
import { IFile, FileType } from '../../../../globalTypes'
import styles from '../SingleProject.module.scss'

type ProjectFileCardProps = {
  add?: boolean
  disable?: boolean
  file: IFile
  fileType: FileType
  selected?: string[]
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>
  showRemoveContent?: boolean
  showAddContent?: boolean
}

const ProjectFileCard = ({
  file,
  fileType,
  selected,
  setSelected,
  showAddContent,
  showRemoveContent,
}: ProjectFileCardProps) => {
  type SelectedState = {
    isSelected: boolean
  }

  const initalState: SelectedState = {
    isSelected: selected!.includes(file._id!),
  }

  const Reducer: ReducerWithoutAction<SelectedState> = (state) => {
    return { isSelected: !state.isSelected }
  }

  const [{ isSelected }, toggleSelected] = useReducer(Reducer, initalState)

  useEffect(() => {
    if (!selected!.length && isSelected) {
      toggleSelected()
    }
  }, [selected, isSelected])

  const handleSelected = () => {
    if (selected && setSelected && selected.includes(file._id!)) {
      setSelected((prev) => [...prev.filter((fileId) => fileId !== file._id)])
    } else if (selected && setSelected) {
      setSelected((prev) => [...prev, file._id!])
    }
    toggleSelected()
  }

  return (
    <li
      key={file._id}
      className={`${
        FileType.IMAGE ? styles.imageWrapper : styles.videoWrapper
      } ${isSelected && styles.selected}`}
    >
      {fileType === FileType.IMAGE && (
        <Image
          draggable={false}
          src={file.url}
          alt={file.title}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      )}
      {fileType === FileType.VIDEO && (
        <div className={styles.videoWrapper}>
          {/*// @ts-ignore */}
          <video src={file.signedUrl} />
        </div>
      )}
      {(showRemoveContent || showAddContent) && (
        <SelectIcon handleSelected={handleSelected} isSelected={isSelected} />
      )}
    </li>
  )
}

export default ProjectFileCard
