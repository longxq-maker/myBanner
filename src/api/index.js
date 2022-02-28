import axios from 'axios'
import {
  Message
} from 'element-ui'

import router from '../router'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 请求拦截器
axios.interceptors.request.use(config => {
  // 如果存在token请求携带token
  if (window.sessionStorage.getItem('tokenStr')) {
    nprogress.start()
    config.headers.Authorization = window.sessionStorage.getItem('tokenStr')
  } else {
    // 不存在token 跳转到登录页面
    router.replace('/')
  }
  return config
}, error => {
  console.log(error)
})

// 配置axios响应拦截
axios.interceptors.response.use(success => {
  nprogress.done()
  if (success.status && success.status === 200) {
    if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
      Message.error({
        message: `${success.data.message}`
      })
    } else if (success.data.message) {
      Message.success({
        message: success.data.message
      })
    }
  }
  return success.data
}, error => {
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
      message: '尚未登录，请登录'
    })
    router.replace('/')
  } else {
    if (error.response.data.message) {
      Message.error({
        message: error.response.data.message
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
