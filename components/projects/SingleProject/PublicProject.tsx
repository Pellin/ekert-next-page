import React from 'react'
import { SingleProjectProps } from '../../../globalTypes'
import PublicImages from '../../images/PublicImages/PublicImages'
import PublicVideos from '../../videos/PublicVideos'
import styles from './SingleProject.module.scss'

const PublicProject = ({ project, images, videos }: SingleProjectProps) => {
  return (
    <div className={styles.singleProjectContainer}>
      <header
        className={`${styles.projectHeader} ${
          !images.length && styles.videoHeader
        }`}
      >
        <h2>{project!.title}</h2>
        <p>{project!.description}</p>
      </header>
      {images.length ? <PublicImages images={images} /> : null}
      {videos.length ? <PublicVideos videos={videos} /> : null}
    </div>
  )
}

export default PublicProject
