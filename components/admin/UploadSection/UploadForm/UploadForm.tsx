import React, { SyntheticEvent, useContext, useRef, useState } from 'react'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import Button from '../../../ui/Button'
import styles from './UploadForm.module.scss'

const UploadForm = () => {
  const [isUploading, setIsuploading] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [hasFiles, setHasFiles] = useState(false)
  const { uploadFiles } = useContext(AdminContext)!
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!inputRef.current) return
    setUploadError(false)
    setIsuploading(true)

    const filesUploaded = await uploadFiles(inputRef)

    if (!filesUploaded) {
      setUploadError(true)
    }
    handleClearInput()
    setIsuploading(false)
  }

  const handleClearInput = () => {
    if (inputRef!.current?.files!.length) {
      inputRef.current.value = ''
      setHasFiles(false)
    }
  }

  const handleChange = () => {
    if (inputRef.current) {
      if (inputRef.current.files?.length) {
        setHasFiles(true)
      }
    }
  }

  return (
    <form
      className={styles.form}
      encType="multipart/form-data"
      onSubmit={handleUpload}
    >
      <input
        onChange={handleChange}
        ref={inputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.mpeg4,.wmv,.flv,.avi"
      />
      <div className={styles.buttons}>
        <Button
          icon={{ name: 'trash-icon.png', alt: 'Rensa' }}
          disabled={!hasFiles}
          type="button"
          title="Rensa"
          text="Rensa"
          onClick={handleClearInput}
        />
        <Button
          icon={{ name: 'upload-icon.png', alt: 'Ladda upp filer' }}
          disabled={!hasFiles}
          title="Ladda upp"
          text="Ladda upp filer "
        />
      </div>
      {isUploading && <p>Laddar upp....</p>}
      {uploadError && <p>Kunde inte ladda upp filer. Försök igen senare.</p>}
    </form>
  )
}

export default UploadForm
