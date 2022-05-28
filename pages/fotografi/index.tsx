import React from 'react'
import { GetStaticProps } from 'next'
import connect from '../../db/connect'
import Image from '../../db/models/Image'
import PublicImages from '../../components/images/PublicImages/PublicImages'
import { IImage } from '../../globalTypes'

const PhotoPage = ({ images }: { images: IImage[] }) => {
  return <PublicImages images={images} />
}

// maybe use server side props instead (also on video and project pages)
export const getStaticProps: GetStaticProps = async () => {
  await connect()

  const response = await Image.find()

  const images = JSON.parse(JSON.stringify(response)) as IImage[]
  return {
    props: {
      images: images.filter((image) => image.public),
    },
    revalidate: 20,
  }
}

export default PhotoPage
