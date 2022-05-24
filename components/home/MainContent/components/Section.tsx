import Link from 'next/link'
import React from 'react'
import styles from '../MainContent.module.scss'

const Section = (props: {
  children: React.ReactNode
  title: string
  link: string
}) => {
  return (
    <section className={styles.section}>
      {props.children}
      <Link href={props.link}>
        <div className={styles.label}>
          <h2>{props.title}</h2>
        </div>
      </Link>
    </section>
  )
}

export default Section
