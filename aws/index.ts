import aws from 'aws-sdk'
aws.config.region = 'eu-west-3'
export const S3_BUCKET = process.env.S3_BUCKET

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})
