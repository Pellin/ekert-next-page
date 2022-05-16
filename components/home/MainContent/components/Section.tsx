import React from 'react'
import styles from '../MainContent.module.scss'

const Section = (props: { children: React.ReactNode; title: string }) => {
  return (
    <section className={styles.section}>
      {props.children}
      <div className={styles.label}>
        <h2>{props.title}</h2>
      </div>
    </section>
  )
}

export default Section
