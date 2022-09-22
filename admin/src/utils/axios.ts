// import Axios from 'axios'
import router from '@/router'
import { message } from 'ant-design-vue'
import Axios from 'axios'
// const api = 'http://localhost:3000'
// export default api
const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})
axios.interceptors.request.use(
  res => {
    const token = localStorage.getItem('token')
    const con: any = res || {}
    if (token) {
      con.headers['Authorization'] = 'Bearer ' + token
    }
    return res
  },
  err => {
    Promise.reject(err)
  }
)
axios.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.status == 401) {
      message.error(err.response.data.message)
    }
    if (err.response.status == 401) {
      message.error('身份认证失败，请重新登录')
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
export default axios
