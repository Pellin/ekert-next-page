import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import slug from 'slug'
import { AdminContext } from '../../../../../contexts/admin/AdminContext'
import { ProjectHeaderProps } from '../../types.'
import styles from '../../SingleProject.module.scss'

const ProjectHeader = ({
  project,
  showAddContent,
  setShowAddContent,
  showRemoveContent,
  setShowRemoveContent,
  setSelectedToAdd,
  setSelectedToRemove,
}: ProjectHeaderProps) => {
  const router = useRouter()
  const { updateProjectTitle, updateProjectDescription } =
    useContext(AdminContext)!
  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description)
  const [editTitleMode, setEditTitleMode] = useState(false)
  const [editDescriptionMode, setEditDescriptionMode] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

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

  const handleUpdateTitle = async () => {
    if (isUpdating) return
    if (title === project.title || !title.length) {
      setEditTitleMode(false)
      setTitle(project.title)
      return
    }

    setIsUpdating(true)
    project.title = title
    const newSlug = slug(title)
    await updateProjectTitle(project._id!, title, newSlug)

    setEditTitleMode(false)
    setIsUpdating(false)

    router.replace(
      {
        pathname: `/admin/projects/[slug]`,
        query: {
          slug: newSlug,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleUpdateDescription = async () => {
    if (isUpdating) return
    if (description === project.description || !description?.length) {
      setEditDescriptionMode(false)
      setDescription(project.description)
      return
    }

    setIsUpdating(true)

    project.description = description

    await updateProjectDescription(project._id!, description)
    setEditDescriptionMode(false)
    setIsUpdating(false)
  }

  return (
    <header className={styles.projectHeader}>
      <div className={styles.titleAndDescription}>
        <label htmlFor="">Titel</label>
        {editTitleMode ? (
          <div className={styles.titleRow}>
            <div className={styles.titleAndSubmitIcon}>
              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <div
                className={styles.submitIconWrapper}
                onClick={handleUpdateTitle}
                title="Spara"
              >
                <Image
                  src="/icons/check-icon.png"
                  alt="Ändra"
                  height={20}
                  width={20}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.titleRow}>
            <div className={styles.titleAndEditIcon}>
              <h2>{project.title}</h2>
              <div
                className={styles.editIconWrapper}
                onClick={() => setEditTitleMode(true)}
                title="Ändra"
              >
                <Image
                  src="/icons/edit-icon.png"
                  alt="Ändra"
                  height={20}
                  width={20}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        )}
        <label htmlFor="">Beskrivning</label>
        {editDescriptionMode ? (
          <div className={styles.descriptionRow}>
            <div className={styles.descriptionAndSubmitIcon}>
              <textarea
                autoFocus
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
              <div
                className={styles.submitIconWrapper}
                onClick={handleUpdateDescription}
                title="Spara"
              >
                <Image
                  src="/icons/check-icon.png"
                  alt="Ändra"
                  height={20}
                  width={20}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.descriptionRow}>
            <div className={styles.descriptionAndEditIcon}>
              <p>{project.description}</p>
              <div
                className={styles.editIconWrapper}
                onClick={() => setEditDescriptionMode(true)}
                title="Ändra"
              >
                <Image
                  src="/icons/edit-icon.png"
                  alt="Ändra"
                  height={20}
                  width={20}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        )}
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
