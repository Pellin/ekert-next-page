import React from 'react'

export type FCProps = {
  children: React.ReactNode
}

export interface IImage {
  _id?: string
  title: string
  url: string
  thumbnail: string
  size: number
}
export interface IVideo {
  _id?: string
  title: string
  url: string
  size: number
  signedUrl?: string
}

export interface IProject {
  _id?: string
  title: string
  images: IImage[]
  videos: IVideo[]
  description?: string
  slug: string
  isProtected: boolean
}

export interface FileData {
  name: string
  data: Buffer
  size: number
  encoding: string
  mimetype: string
}
