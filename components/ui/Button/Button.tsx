import React, { SyntheticEvent } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  title: string
  text: string
  onClick: (e?: SyntheticEvent) => void
}

const Button = ({ title, text, onClick }: ButtonProps) => {
  return (
    <button title={title} onClick={onClick} className={styles.button}>
      {text}
    </button>
  )
}

export default Button
