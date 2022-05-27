import mongoose, { Schema } from 'mongoose'

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
})

export default mongoose.models.User || mongoose.model('User', userSchema)
