import { NextApiHandler } from 'next'
import Video from '../../../../db/models/Video'
import connect from '../../../../db/connect'
import { s3 } from '../../../../aws/index'

const handler: NextApiHandler = async (req, res) => {
  await connect()

  switch (req.method) {
    case 'GET':
      try {
        const videos = await Video.find()

        res.status(200).json(videos)
      } catch (error) {
        res.status(500).json({ message: 'Could not fetch images' })
      }
      break
    // case 'POST':
    //   try {
    //     const image = req.body.image

    //     const created = await Image.create(image)

    //     res.status(201).json(created)
    //   } catch (error) {
    //     console.log(error)

    //     res.status(500).json({ message: 'Could not save image' })
    //   }
    //   break
    // case 'DELETE':
    //   try {
    //     const removedFromDB = await Image.deleteOne({ title: req.body.title })

    //     if (removedFromDB.acknowledged) {
    //       const removedFromS3 = await removeImageFromS3(req.body.title)

    //       if (removedFromS3) {
    //         res.status(200).json({ message: 'Image successfully deleted' })
    //       } else {
    //         res.status(500).json({ message: 'Could not delete image' })
    //       }
    //     } else {
    //       throw new Error()
    //     }
    //   } catch (error) {
    //     console.log(error)

    //     res.status(500).json({ message: 'Could not delete image' })
    //   }
    //   break
  }
}

export default handler
