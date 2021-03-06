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
  size: Number,
  public: Boolean,
})

export default mongoose.models.Image || mongoose.model('Image', imageSchema)
