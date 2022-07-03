import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, err => {})

// 响应拦截器
service.interceptors.response.use((response) => {
  const res = response.data 
  if (res.code === 200 || res.code === 800 || res.code === 801 || res.code === 802 || res.code === 803) {
    return res
  } else {
    return Promise.reject(new Error('fail'))
  }
}, (error) => {
  return Promise.reject(error)
})


export default service