import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connect from '../../../db/connect'
import User from '../../../db/models/User'
import { verifyPassword } from '../../../db/utils'

export default NextAuth({
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: 'Name', type: 'name' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        await connect()

        const user = await User.findOne({ name: credentials!.name })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          console.log(user)

          const passwordMatch = await verifyPassword(
            credentials!.password,
            user.password
          )

          if (passwordMatch) {
            return { email: user.email }
          } else {
            throw new Error('Incorrect password')
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          throw new Error('No user found')
        }
      },
    }),
  ],
})
