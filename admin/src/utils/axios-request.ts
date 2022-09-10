/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from './axios'

export const get = async (url: string, params?: any) => {
  return await axios.get(url, { params: params })
}

export const post = async (url: string, data?: any) => {
  return await axios.post(url, data)
}
