import React from 'react'
import Image from 'next/image'
import styles from './MainContent.module.scss'
import Section from './components/Section'

const MainContent = () => {
  return (
    <div className={styles.mainContainer}>
      <Section title="FOTOGRAFI&gt;&gt;">
        <div className={styles.imageWrapper}>
          <Image
            priority
            src="/images/ae-selfie.jpg"
            alt="Anders Ekert"
            width={200}
            height={200}
            layout="responsive"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </Section>
      <Section title="VIDEO&gt;&gt;">
        <video muted autoPlay loop onContextMenu={(e) => e.preventDefault()}>
          <source src="/videos/sot.mp4" />
        </video>
      </Section>
    </div>
  )
}

export default MainContent
