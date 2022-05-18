import mongoose, { Schema } from 'mongoose'

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  size: Number,
})

export default mongoose.models.Video || mongoose.model('Video', videoSchema)
