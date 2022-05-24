import React, { ReducerWithoutAction, useEffect, useReducer } from 'react'
import Image from 'next/image'
import { FileType } from '../../../../globalTypes'
import { ProjectFileCardProps } from '../types.'
import styles from '../SingleProject.module.scss'

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
      } ${
        isSelected &&
        (showAddContent ? styles.selectedToAdd : styles.selectedToRemove)
      } ${(showAddContent || showRemoveContent) && styles.selectable}`}
    >
      {fileType === FileType.IMAGE && (
        <div
          onClick={
            showAddContent || showRemoveContent ? handleSelected : () => {}
          }
        >
          <Image
            draggable={false}
            src={file.url}
            alt={file.title}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      )}
      {fileType === FileType.VIDEO && (
        <div
          onClick={
            showAddContent || showRemoveContent ? handleSelected : () => {}
          }
          className={styles.videoWrapper}
        >
          {/*// @ts-ignore */}
          <video src={file.signedUrl} />
        </div>
      )}
    </li>
  )
}

export default ProjectFileCard
