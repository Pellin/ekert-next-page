import React from 'react'
import { ProjectCardProps } from '../types'
import Image from 'next/image'
import styles from '../ProjectList.module.scss'
import Link from 'next/link'

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/admin/projekt/${project.slug}`}>
      <div title={`Gå till ${project.title}`} className={styles.projectCard}>
        <div className={styles.titleAndInfo}>
          <div className={styles.titleAndStatus}>
            <h3>{project.title}</h3>
            <div
              title={`Projektet är ${
                project.isProtected ? 'lösenordsskyddat' : 'publikt'
              }`}
              className={styles.statusWrapper}
            >
              <Image
                src={
                  project.isProtected
                    ? '/icons/eye-closed-icon-red.png'
                    : '/icons/eye-open-icon-green.png'
                }
                alt={
                  project.isProtected ? 'Skyddat projekt' : 'Publikt projekt'
                }
                height={project.isProtected ? 18 : 12}
                width={18}
              />
            </div>
          </div>
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
            height={24}
            layout="responsive"
          />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
