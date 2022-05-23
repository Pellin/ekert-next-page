import React from 'react'
import Image from 'next/image'
import styles from '../../SingleProject.module.scss'

type SelectIconProps = {
  handleSelected: () => void
  isSelected: boolean
}

const SelectIcon = ({ handleSelected, isSelected }: SelectIconProps) => {
  return (
    <div
      onClick={handleSelected}
      title={isSelected ? 'Ångra' : 'Lägg till i projekt'}
      className={styles.addOrCancelIconWrapper}
    >
      <Image
        src={
          isSelected
            ? '/icons/circle-minus-icon.png'
            : `/icons/circle-plus-icon.png`
        }
        alt={isSelected ? 'Ångra' : 'Lägg till i projekt'}
        height={14}
        width={14}
      />
    </div>
  )
}

export default SelectIcon
