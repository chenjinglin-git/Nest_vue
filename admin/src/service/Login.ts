import { post } from '@/utils/axios-request'
import { Login, FindUser } from './api'
import router from '@/router'
import { message } from 'ant-design-vue'
import vuex from '../store/index'
export const login = async (body: { adminuser: string; adminpass: string }) => {
  const { data } = await post(Login, body)
  localStorage.setItem('token', data.token)
  const user = await FindUserFuc()
  vuex.commit('setIsLogin', true)
  vuex.commit('setUser', user)
  message.success('登录成功')
  router.push('/')
}

export const FindUserFuc = async () => {
  const { data } = await post(FindUser)
  return data
}
