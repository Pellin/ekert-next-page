import { NextApiHandler } from 'next'
import Image from '../../../../db/models/Image'
import connect from '../../../../db/connect'

const handler: NextApiHandler = async (req, res) => {
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
    case 'DELETE':
      try {
        const success = await Image.deleteOne({ _id: req.body.id })
        console.log(success.acknowledged)
        if (success.acknowledged) {
          res.status(200).json({ message: 'Image successfully deleted' })
        } else {
          throw new Error()
        }
      } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'Could not delete image' })
      }
  }
}

export default handler
