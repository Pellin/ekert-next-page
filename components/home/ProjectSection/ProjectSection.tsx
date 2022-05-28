import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './ProjectSection.module.scss'

const ProjectSection = () => {
  return (
    <section className={styles.projectSection}>
      <h2>Projekt i urval</h2>
      <ul className={styles.projectGrid}>
        <li className={styles.projectCard}>
          <Link href="/projekt/trolljagarna">
            <div className={styles.cardImageWrapper}>
              <Image
                src="/images/trolljagarna.png"
                alt="Trolljägarna - Robert Achberg"
                width={'100%'}
                height={'100%'}
                objectFit="contain"
                layout="responsive"
              />
              <div className={styles.gradient}></div>
            </div>
          </Link>
          <h3 className={styles.red}>TROLLJÄGARNA</h3>
        </li>
        <li className={styles.projectCard}>
          <Link href="/projekt/klimatkampen">
            <div className={styles.cardImageWrapper}>
              <Image
                src="/images/klimatkampen.jpeg"
                alt="Klimatkampen"
                width={'100%'}
                height={'100%'}
                objectFit="cover"
                layout="responsive"
              />
              <div className={styles.gradient}></div>
            </div>
          </Link>
          <h3 className={styles.green}>KLIMATKAMPEN</h3>
        </li>
        <li className={styles.projectCard}>
          <Link href="/projekt/perspektiv-pa-varlden">
            <div className={styles.cardImageWrapper}>
              <Image
                src="/images/perspektiv-på-varlden.jpeg"
                alt="Perspektiv på världen"
                width={'100%'}
                height={'100%'}
                objectFit="cover"
                layout="responsive"
              />
              <div className={styles.gradient}></div>
            </div>
          </Link>
          <h3>PERSPEKTIV PÅ VÄRLDEN</h3>
        </li>
      </ul>
    </section>
  )
}

export default ProjectSection
