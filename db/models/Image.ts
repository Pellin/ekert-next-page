import mongoose, { Schema } from 'mongoose'

export const imageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
  },
  size: Number,
})

export default mongoose.models.Image || mongoose.model('Image', imageSchema)
