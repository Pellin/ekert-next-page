import React from 'react'
import Image from 'next/image'
import styles from '../SingleProject.module.scss'
import { IProject } from '../../../../globalTypes'

type ProjectHeaderProps = {
  project: IProject
  showAddContent: boolean
  setShowAddContent: React.Dispatch<React.SetStateAction<boolean>>
  showRemoveContent: boolean
  setShowRemoveContent: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedToAdd: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedToRemove: React.Dispatch<React.SetStateAction<string[]>>
}

const ProjectHeader = ({
  project,
  showAddContent,
  setShowAddContent,
  showRemoveContent,
  setShowRemoveContent,
  setSelectedToAdd,
  setSelectedToRemove,
}: ProjectHeaderProps) => {
  const handleShowAdd = () => {
    setShowRemoveContent(false)
    setSelectedToRemove([])
    setShowAddContent(true)
  }
  const handleShowRemove = () => {
    setShowAddContent(false)
    setSelectedToAdd([])
    setShowRemoveContent(true)
  }

  return (
    <header className={styles.projectHeader}>
      <div className={styles.titleAndDescription}>
        <div className={styles.titleRow}>
          <label htmlFor="">Titel</label>
          <h2>{project.title}</h2>
        </div>
        <div className={styles.descriptionRow}>
          <label htmlFor="">Beskrivning</label>
          <p>{project.description}</p>
        </div>
      </div>
      <nav className={styles.actions}>
        <ul className={styles.actionMenu}>
          <li
            onClick={() => (showAddContent ? null : handleShowAdd())}
            title="Lägg till nytt innehåll"
            className={`${styles.actionMenuItem} ${
              showAddContent && styles.large
            }`}
          >
            <Image
              src="/icons/circle-plus-icon.png"
              alt="Lägg till innehåll"
              width={22}
              height={22}
              layout="responsive"
            />
          </li>
          <li
            onClick={() => (showRemoveContent ? null : handleShowRemove())}
            title="Ta bort innehåll"
            className={`${styles.actionMenuItem} ${
              showRemoveContent && styles.large
            }`}
          >
            <Image
              src="/icons/circle-minus-icon.png"
              alt="Ta bort innehåll"
              width={22}
              height={22}
              layout="responsive"
            />
          </li>
          <li title="Radera projekt" className={styles.actionMenuItem}>
            <Image
              src="/icons/trash-icon.png"
              alt="Radera projekt"
              width={22}
              height={22}
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default ProjectHeader
