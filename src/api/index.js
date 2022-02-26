import axios from 'axios'
import {
  Message
} from 'element-ui'

import router from '../router'

// 请求拦截器
axios.interceptors.request.use(config => {
  const getToken = window.sessionStorage.getItem('tokenStr')
  if (getToken) {
    config.headers.Authorization = getToken
  }
}, error => {
  console.log(error)
})

// 配置axios响应拦截
axios.interceptors.response.use(success => {
    if (success.status && success.status === 200) {
      if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
        Message.error({
          message: `${success.data.message}错误`
        })
      } else if (success.data.message) {
        Message.success({
          message: success.data.message
        })
      }
    }
    return success.data
  },
  error => {
    if (error.response.code === 504 || error.response.code === 404) {
      Message.error({
        message: '服务器被吃了o(╯□╰)o'
      })
    } else if (error.response.code === 403) {
      Message.error({
        message: '权限不足，请联系管理员'
      })
    } else if (error.response.code === 401) {
      Message.error({
        message: '尚未登录请登录'
      })
      router.replace('/login')
    } else {
      if (error.response.data.message) {
        Message.error({
          message: error.response.data.message
        })
      } else {
        Message.error({
          message: '未知错误'
        })
      }
    }
  })

// post请求拦截器
const base = ''
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}
// get请求拦截器
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}
// put 请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}
// delete拦截器
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}
