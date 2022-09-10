import { Blog, BlogsDelete, BlogsUpdate } from './api'
import { get, post } from '@/utils/axios-request'
interface Blogx {
  title: string
  cover: string
  introduce: string
  content: string
  htmlconten: string
  tag: string
  state: boolean
}
export const BlogCreate = async (body: Blogx) => {
  const { data } = await post(Blog, body)
  return data
}
export const BlogFindAll = async (params: any) => {
  const { data } = await get(Blog, params)
  return data
}
export const BlogDelete = async (id: string) => {
  const { data } = await post(`${BlogsDelete}/${id}`)
  return data
}
export const BlogUpdate = async (body: any) => {
  const { data } = await post(BlogsUpdate, body)
  return data
}
