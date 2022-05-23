import { NextApiHandler } from 'next'
import Project from '../../../../db/models/Project'
import connect from '../../../../db/connect'
import slug from 'slug'

const handler: NextApiHandler = async (req, res) => {
  await connect()

  switch (req.method) {
    case 'GET':
      try {
        const projects = await Project.find()

        res.status(200).json(projects)
      } catch (error) {
        res.status(500).json({ message: 'Could not fetch projects' })
      }
      break
    case 'POST':
      try {
        const project = {
          title: req.body.title,
          description: req.body.description,
          images: [],
          videos: [],
          slug: slug(req.body.title),
        }

        const created = await Project.create(project)

        res.status(201).json(created)
      } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'Could not create project' })
      }
      break
    case 'PUT':
      try {
        const response = await Project.updateOne(
          { _id: req.body.projectId },
          req.body.update
        )

        if (response.acknowledged) {
          res.status(200).json({ message: 'Project updated', response })
        } else {
          throw new Error('Could not update')
        }
      } catch (error) {
        res.status(500).json({ error })
      }
      break
  }
}

export default handler
