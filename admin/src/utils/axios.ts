// import Axios from 'axios'
import Axios from 'axios'
// const api = 'http://localhost:3000'
// export default api
const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})
// axios.interceptors.request.use(
//   res => {
//     // console.log(res)
//     return res
//   },
//   err => {
//     Promise.reject(err)
//   }
// )
// axios.interceptors.response.use(
//   res => {
//     return res.data
//   },
//   err => {
//     Promise.reject(err)
//   }
// )
export default axios
