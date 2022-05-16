import React, { SyntheticEvent, useContext, useRef, useState } from 'react'
import axios from 'axios'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import styles from './UploadForm.module.scss'

const UploadForm = () => {
  const [isUploading, setIsuploading] = useState(false)
  const { setImages } = useContext(AdminContext)!
  const inputRef = useRef<HTMLInputElement>(null)

  // lägg i context istället
  const handleUpload = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!inputRef.current) return
    setIsuploading(true)

    const data = new FormData()
    const filesLength = inputRef.current.files!.length

    for (let i = 0; i < filesLength; i++) {
      data.append('data', inputRef.current.files![i])
    }

    const response = await axios.post('/api/admin/upload', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })

    setImages((prev) => [...prev, ...response.data.files])
    setIsuploading(false)
  }

  return (
    <form encType="multipart/form-data" onSubmit={handleUpload} method="post">
      <input ref={inputRef} type="file" multiple />
      <button>Ladda upp filer</button>
      {isUploading && <p>Laddar upp....</p>}
    </form>
  )
}

export default UploadForm
