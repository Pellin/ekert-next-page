import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import connect from '../../../../db/connect'
import Video from '../../../../db/models/Video'

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
        const videos = await Video.find()

        res.status(200).json(videos)
      } catch (error) {
        res.status(500).json({ message: 'Could not fetch images' })
      }
      break
    case 'PUT':
      try {
        const updated = await Video.updateOne(
          { _id: req.body.fileId },
          req.body.update
        )

        res.status(200).json({ status: { success: updated.acknowledged } })
      } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'Could not update image' })
      }
      break
  }
}

export default handler
