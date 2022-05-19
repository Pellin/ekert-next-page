import mongoose, { Schema } from 'mongoose'
import { imageSchema } from './Image'
import { videoSchema } from './Video'

const projectSchema = new Schema({
  title: String,
  description: String,
  images: [imageSchema],
  videos: [videoSchema],
  slug: String,
})

export default mongoose.models.Project ||
  mongoose.model('Project', projectSchema)
