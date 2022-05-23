import React, { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import { AdminContext } from '../../../../contexts/admin/AdminContext'
import { IVideo } from '../../../../globalTypes'
import styles from './VideoList.module.scss'

const VideoCard = ({ video }: { video: IVideo }) => {
  const { openLightbox, refreshVideoUrl } = useContext(AdminContext)!
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentUrl, setCurrentUrl] = useState(video.signedUrl)
  const [isUpdating, setIsUpdating] = useState(false)

  const refetchUrl = async (title: string) => {
    setIsUpdating(true)

    const newUrl = await refreshVideoUrl(title)

    if (videoRef.current) {
      setCurrentUrl(newUrl)
      setIsUpdating(false)
    }
  }

  return (
    <li className={styles.videoCard}>
      <div className={styles.cardHeader}>
        <p>{video.title}</p>
        <div
          onClick={() => openLightbox(video)}
          title="Inspektera"
          className={styles.iconWrapper}
        >
          <Image
            title="Inspektera"
            src="/icons/info-icon.png"
            alt="Inspektera"
            width={16}
            height={16}
          />
        </div>
      </div>
      <video
        ref={videoRef}
        onContextMenu={(e) => e.preventDefault()}
        controls
        controlsList="nodownload"
        src={currentUrl}
        onError={() => refetchUrl(video.title)}
      />
      {isUpdating && <p>Uppdaterar video...</p>}
    </li>
  )
}

export default VideoCard
