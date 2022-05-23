import React from 'react'
import Image from 'next/image'
import styles from '../../SingleProject.module.scss'

type RemoveIconProps = {
  disable: boolean
  handleSelected: () => void
}

const RemoveIcon = ({ disable, handleSelected }: RemoveIconProps) => {
  return (
    <div
      onClick={handleSelected}
      title="Ta bort från projekt"
      className={`${styles.deleteIconWrapper} ${disable && styles.disabled} `}
    >
      <Image
        src="/icons/trash-icon.png"
        alt="Ta bort från projekt"
        height={14}
        width={14}
      />
    </div>
  )
}

export default RemoveIcon
