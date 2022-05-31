import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import { getSignedVideoUrl } from '../../../../aws/helpers'

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  switch (req.method) {
    case 'GET':
      try {
        const title = req.query.title as string
        let key = `videos/${title}`

        if (process.env.NODE_ENV === 'development') {
          key = `test/${key}`
        }
        const url = await getSignedVideoUrl(key)

        res.status(200).json(url)
      } catch (error) {
        res.status(500).json({ message: 'Could not fetch url' })
      }
      break
  }
}

export default handler
