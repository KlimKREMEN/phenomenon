import axios from 'axios'

export interface IPhotoList extends Array<IPhoto> {}

const getData = async (start: number = 0, limit: string = '') => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/photos?_start=${start}&_limit=${limit}`
  )
  return response.data
}

export interface IPhoto {
  albumId: number
  id: number
  thumbnailUrl: string
  title: string
  url: string
  featured?: boolean
}

const getPhoto = async (id: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/photos/${id}`
  )
  return response.data
}

const photosService = {
  getData,
  getPhoto,
}

export default photosService
