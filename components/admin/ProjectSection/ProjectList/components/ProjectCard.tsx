import React from 'react'
import { ProjectCardProps } from '../types'
import Image from 'next/image'
import styles from '../ProjectList.module.scss'
import Link from 'next/link'

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/admin/projects/${project._id}`}>
      <div title={`Gå till ${project.title}`} className={styles.projectCard}>
        <div className={styles.titleAndInfo}>
          <h3>{project.title}</h3>
          <p>
            {project.images.length}{' '}
            {project.images.length === 1 ? 'bild' : 'bilder'},{' '}
            {project.videos.length}{' '}
            {project.videos.length === 1 ? 'video' : 'videor'}
          </p>
        </div>
        <div className={styles.iconWrapper}>
          <Image
            src="/icons/chevron-right-icon.png"
            alt="Gå till projekt"
            width={24}
            height={30}
          />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
