import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import Image from '../../../../db/models/Image'
import connect from '../../../../db/connect'
import { removeFileFromS3 } from '../../../../aws/helpers'
import { FileType } from '../../../../globalTypes'

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  await connect()

  switch (req.method) {
    case 'GET':
      try {
        const images = await Image.find()

        res.status(200).json(images)
      } catch (error) {
        res.status(500).json({ message: 'Could not fetch images' })
      }
      break
    case 'POST':
      try {
        const image = req.body.image

        const created = await Image.create(image)

        res.status(201).json(created)
      } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'Could not save image' })
      }
      break
    case 'PUT':
      try {
        const updated = await Image.updateOne(
          { _id: req.body.fileId },
          req.body.update
        )
        res.status(200).json({ status: { success: updated.acknowledged } })
      } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'Could not update image' })
      }
      break
    case 'DELETE':
      try {
        const removedFromDB = await Image.deleteOne({ title: req.body.title })

        if (removedFromDB.acknowledged) {
          const removedFromS3 = await removeFileFromS3(
            req.body.title,
            FileType.IMAGE
          )

          if (removedFromS3) {
            res.status(200).json({ message: 'Image successfully deleted' })
          } else {
            res.status(500).json({ message: 'Could not delete image' })
          }
        } else {
          throw new Error()
        }
      } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'Could not delete image' })
      }
      break
  }
}

export default handler
