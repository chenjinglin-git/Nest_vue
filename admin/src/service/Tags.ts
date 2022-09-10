import { TagDelete, Tags, TagUpdate } from './api'
import { get, post } from '@/utils/axios-request'
export const TagsFindAll = async (query: any) => {
  return await get(Tags, query)
}
export const TagsCreate = async (body: any) => {
  return await post(Tags, body)
}
export const TagsDelete = async (id: string) => {
  return await post(`${TagDelete}/${id}`)
}
export const TagsUpdate = async (body: any) => {
  return await post(TagUpdate, body)
}
