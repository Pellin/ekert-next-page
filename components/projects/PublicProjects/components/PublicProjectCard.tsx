import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IImage, IProject } from '../../../../globalTypes'
import styles from '../PublicProjects.module.scss'

type PublicProjectCardProps = {
  project: IProject
  images: IImage[]
}

const PublicProjectCard = ({ project, images }: PublicProjectCardProps) => {
  const [featureImage, setFeatureImage] = useState<IImage | null>(null)

  useEffect(() => {
    if (images) {
      const projectImages = images.filter((image) =>
        project.images.includes(image._id!)
      )

      setFeatureImage(projectImages[0])
    }
  }, [images, project.images])

  return (
    <Link href={`/projekt/${encodeURIComponent(project.slug)}`}>
      <li
        style={{ backgroundImage: `url(${featureImage?.url})` }}
        key={project._id}
        className={styles.projectWrapper}
      >
        <div className={styles.titleAndDescription}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
        <div className={styles.gradient}></div>
      </li>
    </Link>
  )
}

export default PublicProjectCard
