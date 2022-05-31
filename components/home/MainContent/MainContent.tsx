import React from 'react'
import Image from 'next/image'
import Section from './components/Section'
import ClientSection from '../ClientSection'
import ProjectSection from '../ProjectSection'
import styles from './MainContent.module.scss'

const MainContent = () => {
  return (
    <div className={styles.mainContainer}>
      <Section link="/video" title="VIDEO&gt;&gt;">
        <video muted autoPlay loop onContextMenu={(e) => e.preventDefault()}>
          <source src="/videos/sot.mp4" />
        </video>
      </Section>
      <Section link="/fotografi" title="FOTOGRAFI&gt;&gt;">
        <div className={styles.imageWrapper}>
          <Image
            priority
            src="/images/bangkok.jpg"
            alt="Butiksägare i Bangkok"
            width={800}
            height={500}
            layout="responsive"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </Section>
      <ClientSection />
      <ProjectSection />
      <div className={styles.imageWrapper}>
        <Image
          priority
          src="/images/ae-selfie.jpg"
          alt="Anders Ekert"
          width={800}
          height={800}
          layout="responsive"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  )
}

export default MainContent
