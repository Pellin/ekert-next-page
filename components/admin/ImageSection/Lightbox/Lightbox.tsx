import Image from 'next/image'
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import { IImage, IProject } from '../../../../globalTypes'
import styles from './Lightbox.module.scss'

type LightBoxProps = {
  image: IImage | null
  visible: boolean
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>
}

const Lightbox = ({ image, visible, setShowLightbox }: LightBoxProps) => {
  const { projects } = useContext(AdminContext)!
  const [associatedProjects, setAssociatedProjects] = useState<IProject[]>([])
  const [naturalHeight, setNaturalHeight] = useState(400)
  const [naturalWidth, setNaturalWidth] = useState(400)
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    setAssociatedProjects(
      projects.filter((project) => project.images.includes(image?._id!))
    )
  }, [projects, image?._id!])

  const getDimensions = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsLandscape(e.currentTarget.naturalWidth > e.currentTarget.naturalHeight)
    setNaturalHeight(e.currentTarget.naturalHeight)
    setNaturalWidth(e.currentTarget.naturalWidth)
  }

  if (!image) return null

  const imageSize = `${(
    image.size / (image.size > 1000000 ? 1000000 : 1000)
  ).toFixed(1)} ${image.size > 1000000 ? 'MB' : 'KB'}`

  const handleRemoveImageFromProject = (projectId: string) => {
    setAssociatedProjects((prev) =>
      // call context removeImageFromProject
      prev.filter((project) => project._id !== projectId)
    )
  }

  return (
    <div className={visible ? styles.lightbox : styles.hidden}>
      <aside className={styles.infoBox}>
        <h2>{image.title}</h2>
        <h4>{imageSize}</h4>
        <h3>I projekt:</h3>
        {associatedProjects.length ? (
          <ul className={styles.associatedProjects}>
            {associatedProjects.map((project) => (
              <li className={styles.projectRow} key={project._id}>
                <p>{project.title}</p>
                <div
                  onClick={() => handleRemoveImageFromProject(project._id!)}
                  title="Ta bort från projekt"
                  className={styles.minusIconWrapper}
                >
                  <Image
                    src="/icons/circle-minus-icon-white.png"
                    alt="Ta bort från projekt"
                    height={14}
                    width={14}
                    layout="responsive"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga associerade projekt</p>
        )}
      </aside>
      <div className={styles.imageContainer}>
        <div
          className={styles.imageWrapper}
          style={isLandscape ? { width: '75%' } : { width: '50%' }}
        >
          <Image
            alt={image.title}
            height={naturalHeight}
            layout="responsive"
            onLoad={(e) => getDimensions(e)}
            src={image.url}
            width={naturalWidth}
          />
        </div>
      </div>
      <div
        onClick={() => setShowLightbox(false)}
        className={styles.iconWrapper}
      >
        <Image
          alt="close-icon"
          height={20}
          src="/icons/close-icon.png"
          width={20}
        />
      </div>
    </div>
  )
}

export default Lightbox
