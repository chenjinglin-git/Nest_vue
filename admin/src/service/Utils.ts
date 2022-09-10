import { post } from '@/utils/axios-request'
import { upload } from './api'
export const Upload = async (form: FormData) => {
  return await post(upload, form)
}
