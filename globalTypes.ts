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
  public: boolean
}
export interface IVideo {
  _id?: string
  title: string
  url: string
  size: number
  signedUrl?: string
  public: boolean
}

export interface IProject {
  _id?: string
  title: string
  images: string[]
  videos: string[]
  description?: string
  slug: string
  isProtected: boolean
  password?: string
}

export interface FileData {
  name: string
  data: Buffer
  size: number
  encoding: string
  mimetype: string
}

export type IFile = IImage | IVideo

export enum FileType {
  IMAGE,
  VIDEO,
}
