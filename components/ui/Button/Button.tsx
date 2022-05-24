import Image from 'next/image'
import React, { SyntheticEvent } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  icon?:
    | {
        alt: string
        height?: number
        name: string
        width?: number
      }
    | false
  type?: string
  color?: string
  backgroundColor?: string
  disabled?: boolean
  title: string
  text: string
  onClick?: (e?: SyntheticEvent) => void
}

const Button = ({
  icon,
  type,
  color,
  backgroundColor,
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
      style={
        color ? { backgroundColor, color, borderColor: 'transparent' } : {}
      }
    >
      {icon && (
        <div className={styles.icon}>
          <Image
            className={styles.icon}
            src={`/icons/${icon.name}`}
            alt={styles.alt}
            width={icon.width || 14}
            height={icon.height || 14}
          />
        </div>
      )}
      {text}
    </button>
  )
}

export default Button
