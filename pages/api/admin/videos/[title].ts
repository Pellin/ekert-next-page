import { NextApiHandler } from 'next'
import { getSignedVideoUrl } from '../../../../aws/helpers'

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const title = req.query.title as string
        const url = await getSignedVideoUrl(`test/videos/${title}`)

        res.status(200).json(url)
      } catch (error) {
        res.status(500).json({ message: 'Could not fetch url' })
      }
      break
  }
}

export default handler
