import React, { SyntheticEvent, useContext, useRef, useState } from 'react'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import Button from '../../../ui/Button'
import styles from './NewProjectForm.module.scss'

const NewProjectForm = () => {
  const { createEmptyProject } = useContext(AdminContext)!
  const [showForm, setShowForm] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const [isProtected, setIsProtected] = useState(false)

  const handleCreateProject = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (titleRef.current && descriptionRef.current) {
      await createEmptyProject({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        isProtected,
      })
      titleRef.current.value = ''
      descriptionRef.current.value = ''
      setShowForm(false)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <Button
        icon={
          !showForm && {
            name: 'circle-plus-icon.png',
            alt: 'Skapa nytt projekt',
          }
        }
        title={showForm ? 'Stäng formuläret' : 'Skapa nytt tomt projekt'}
        onClick={() => setShowForm(!showForm)}
        text={showForm ? 'Avbryt' : 'Nytt projekt'}
      />
      {showForm && (
        <form className={styles.newProjectForm} onSubmit={handleCreateProject}>
          <div className={styles.formRow}>
            <label htmlFor="title">Projektnamn</label>
            <input ref={titleRef} id="title" type="text" maxLength={20} />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="description">Beskrivning</label>
            <textarea
              ref={descriptionRef}
              id="description"
              rows={5}
              maxLength={100}
            />
          </div>
          <div className={styles.checkboxRow}>
            <input
              checked={isProtected}
              onChange={() => setIsProtected(!isProtected)}
              type="checkbox"
            />
            <label>Lösenordsskyddat</label>
          </div>
          <Button
            title="Skapa projekt"
            onClick={(e) => handleCreateProject(e!)}
            text="Skapa projekt"
          />
        </form>
      )}
    </div>
  )
}

export default NewProjectForm
