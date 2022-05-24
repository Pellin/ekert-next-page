import React from 'react'
import { GetStaticProps } from 'next'
import Image from '../../db/models/Image'
import { IImage } from '../../globalTypes'
import PublicImages from '../../components/images/PublicImages/PublicImages'

const PhotoPage = ({ images }: { images: IImage[] }) => {
  return <PublicImages images={images} />
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await Image.find()

  const images = JSON.parse(JSON.stringify(response)) as IImage[]
  return {
    props: {
      images: images.filter((image) => image.public),
    },
    revalidate: 60 * 60,
  }
}

export default PhotoPage
