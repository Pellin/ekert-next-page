import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import fileUpload from 'express-fileupload'
import { getFileType, uploadFileToS3 } from '../../../aws/helpers'
import Image from '../../../db/models/Image'
import Video from '../../../db/models/Video'
import { FileData, IImage, IVideo } from '../../../globalTypes'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface RequestWithFiles extends NextApiRequest {
  files: {
    data: FileData | FileData[]
  }
}

const handler = nc<RequestWithFiles, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(500).json({ error: err.stack })
  },
})
  .use(fileUpload())
  .post(async (req, res) => {
    const { files } = req

    const dbFiles = []
    let uploadedCount = 0

    if (Array.isArray(files.data)) {
      for (const file of files.data) {
        const uploadedImage = await handleFileUpload(file)
        dbFiles.push(uploadedImage)
        uploadedCount++
      }
    } else {
      const uploadedImage = await handleFileUpload(files.data)
      dbFiles.push(uploadedImage)
      uploadedCount++
    }

    res.status(200).json({ files: dbFiles, count: uploadedCount })
  })

const handleFileUpload = async (file: FileData) => {
  const success = await uploadFileToS3(file)

  if (success) {
    const fileType = getFileType(file.mimetype)

    if (fileType === 'images') {
      const newImage: IImage = new Image({
        title: file.name,
        url: success.url,
        thumbnail: success.thumbnail,
      })

      const uploadedImage = await addImageToDatabase(newImage)

      return uploadedImage
    } else if (fileType === 'videos') {
      const newVideo: IVideo = new Video({
        title: file.name,
        url: success.url,
      })

      const uploadedVideo = await addVideoToDatabase(newVideo)

      return uploadedVideo
    }
  }
}

const addImageToDatabase = async (image: IImage) => {
  const newImage = await Image.create(image)

  return newImage
}

const addVideoToDatabase = async (video: IVideo) => {
  const newVideo = await Video.create(video)

  return newVideo
}

export default handler
