import { s3, S3_BUCKET } from '.'
import { FileData } from '../globalTypes'
import sharp from 'sharp'
import { ManagedUpload } from 'aws-sdk/clients/s3'

export const uploadFileToS3 = async (file: FileData) => {
  const fileType = getFileType(file.mimetype)

  let key = `${fileType}/${file.name}`

  if (process.env.NODE_ENV === 'development') {
    key = `test/${fileType}/${file.name}`
  }

  const params = {
    Bucket: S3_BUCKET!,
    Key: key,
    Body: file.data,
    Encoding: file.encoding,
    ContentType: file.mimetype,
    ACL: 'public-read',
  }

  let uploadedThumbnail: ManagedUpload.SendData | null = null

  const uploadedFile = await s3.upload(params).promise()
  if (fileType === 'images') {
    uploadedThumbnail = await createAndUploadThumbnailToS3(file)
  }

  if (uploadedFile) {
    return {
      url: uploadedFile.Location,
      thumbnail: uploadedThumbnail?.Location,
    }
  } else {
    return false
  }
}

export const getFileType = (mimetype: string) => {
  if (mimetype.match(/^video/)) {
    return 'videos'
  } else if (mimetype.match(/^image/)) {
    return 'images'
  }

  return undefined
}

export const createAndUploadThumbnailToS3 = async (file: FileData) => {
  let key = `images/${file.name.replace(/\.[^/.]+$/, '')}-thumb.png`

  if (process.env.NODE_ENV === 'development') {
    key = `test/images/${file.name.replace(/\.[^/.]+$/, '')}-thumb.png`
  }

  const thumbnail = await sharp(file.data)
    .rotate()
    .resize({ width: 150 })
    .toBuffer()

  const thumbnailParams = {
    Bucket: S3_BUCKET!,
    Key: key,
    Body: thumbnail,
    ContentType: 'image/png',
    ACL: 'public-read',
  }

  const uploadedThumbnail = await s3.upload(thumbnailParams).promise()

  return uploadedThumbnail
}
