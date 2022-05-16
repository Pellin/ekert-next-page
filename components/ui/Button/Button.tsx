import Image from 'next/image'
import React, { SyntheticEvent } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  icon?:
    | {
        name: string
        alt: string
      }
    | false
  type?: string
  disabled?: boolean
  title: string
  text: string
  onClick?: (e?: SyntheticEvent) => void
}

const Button = ({
  icon,
  type,
  title,
  text,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type ? 'button' : 'submit'}
      disabled={disabled}
      title={title}
      onClick={onClick ? onClick : () => {}}
      className={`${styles.button} ${disabled ? styles.disabled : null}`}
    >
      {icon && (
        <div className={styles.icon}>
          <Image
            className={styles.icon}
            src={`/icons/${icon.name}`}
            alt={styles.alt}
            width={14}
            height={14}
          />
        </div>
      )}
      {text}
    </button>
  )
}

export default Button
