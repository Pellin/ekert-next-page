import { NextApiHandler } from 'next'
import connect from '../../../db/connect'
import User, { userSchema } from '../../../db/models/User'
import { hashPassword } from '../../../db/utils'

type UserPayload = {
  name: string
  password: string
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return
  }

  await connect()
  const user = req.body as UserPayload
  const { name, password } = user

  if (!name || !password) {
    res.status(422).json({ message: 'Invalid credentials' })
    return
  }

  const existingUser = await User.findOne({ name })

  if (existingUser) {
    res.status(409).json({ message: 'User already exists' })
    return
  }

  user.password = await hashPassword(user.password)

  const createdUser = await User.create(user)

  console.log(createdUser)

  res.status(201).json({ message: 'User created' })
}

export default handler
