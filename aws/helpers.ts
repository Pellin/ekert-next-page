import { s3, S3_BUCKET } from '.'
import { FileData, FileType } from '../globalTypes'

export const getSignedVideoUrl = async (key: string) => {
  try {
    const url = s3.getSignedUrl('getObject', {
      Bucket: S3_BUCKET!,
      Key: key,
      Expires: 1800,
    })

    return url
  } catch (error) {
    console.log(error)
  }
}

export const uploadFileToS3 = async (file: FileData) => {
  try {
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
      ACL: fileType === 'images' ? 'public-read' : 'private',
    }

    const uploadedFile = await s3.upload(params).promise()

    if (uploadedFile) {
      return {
        url: uploadedFile.Location,
      }
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

export const removeFileFromS3 = async (title: string, fileType: FileType) => {
  let key = title

  if (fileType === FileType.IMAGE) {
    key = `images/${key}`
  } else {
    key = `videos/${key}`
  }

  if (process.env.NODE_ENV === 'development') {
    key = `test/${key}`
  }

  const params = {
    Bucket: S3_BUCKET!,
    Key: key,
  }

  await s3.deleteObject(params).promise()

  return true
}

export const getFileType = (mimetype: string) => {
  if (mimetype.match(/^video/)) {
    return 'videos'
  } else if (mimetype.match(/^image/)) {
    return 'images'
  }

  return undefined
}
