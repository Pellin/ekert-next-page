import { useRouter } from 'next/router'
import React from 'react'
import Button from '../Button'

const BackButton = () => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      title="Tillbaka"
      text="Tillbaka"
      icon={{
        name: 'chevron-left-icon.png',
        alt: 'Tillbaka',
        height: 8,
        width: 6,
      }}
    />
  )
}

export default BackButton
