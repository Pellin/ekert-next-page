import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connect from '../../../db/connect'
import { verifyPassword } from '../../../db/utils'
import User from '../../../db/models/User'

export default NextAuth({
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Namn', type: 'name' },
        password: { label: 'Lösenord', type: 'password' },
      },
      async authorize(credentials, req) {
        await connect()

        const user = await User.findOne({ name: credentials!.name })

        if (user) {
          const passwordMatch = await verifyPassword(
            credentials!.password,
            user.password
          )

          if (passwordMatch) {
            return { name: user.name }
          } else {
            throw new Error('Felaktigt lösenord')
          }
        } else {
          throw new Error('Ingen användare hittad')
        }
      },
    }),
  ],
})
