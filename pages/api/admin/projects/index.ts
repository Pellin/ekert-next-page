import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import slug from 'slug'
import Project from '../../../../db/models/Project'
import connect from '../../../../db/connect'
import { hashPassword } from '../../../../db/utils'
import { generatePassword } from '../../../../utils'
import { IProject } from '../../../../globalTypes'

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
        const projects = await Project.find()

        res.status(200).json(projects)
      } catch (error) {
        res.status(500).json({ message: 'Could not fetch projects' })
      }
      break
    case 'POST':
      try {
        const project: IProject = {
          title: req.body.title,
          description: req.body.description,
          images: [],
          videos: [],
          slug: slug(req.body.title),
          isProtected: req.body.isProtected,
        }

        let password: string | undefined = undefined
        let hashedPassword: string

        if (project.isProtected) {
          password = generatePassword(8)
          hashedPassword = await hashPassword(password)
          project.password = hashedPassword
        }

        const created = await Project.create(project)

        res.status(201).json({
          project: created,
          password,
        })
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
