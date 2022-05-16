import React from 'react'
import { ProjectCardProps } from '../types'
import Image from 'next/image'
import styles from '../ProjectList.module.scss'
import Link from 'next/link'

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/admin/projects/${project.slug}`}>
      <div title={`Gå till ${project.title}`} className={styles.projectCard}>
        <div className={styles.titleRow}>
          <h3>{project.title}</h3>
        </div>
        <p>{project.images.length} bilder</p>
        <p>{project.videos.length} videor</p>
        {project.images.length ? (
          <div className={styles.projectImageWrapper}>
            <Image
              src={project.images[0].thumbnail}
              alt={project.title}
              width={50}
              height={50}
            />
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default ProjectCard
