import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
  title: String,
  description: String,
  images: [String],
  videos: [String],
  slug: String,
  password: String,
})

export default mongoose.models.Project ||
  mongoose.model('Project', projectSchema)
