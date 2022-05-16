import mongoose from 'mongoose'

// @ts-ignore
let cached = global.mongoose

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null }
}

const connect = async () => {
  if (cached.conn) {
    return cached.conn
  }

  let connectionString = process.env.MONGODB_URI as string

  if (process.env.NODE_ENV === 'development') {
    connectionString = process.env.MONGODB_URI_DEV as string
  }

  return mongoose.connect(connectionString)
}

export default connect
