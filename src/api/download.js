/*
 * @Description:封装下载请求
 * @Author: longxq
 * @Date: 2022-03-06 19:40:51
 * @LastEditTime: 2022-03-06 22:42:51
 * @LastEditors: longxq
 * @Reference:
 */
import axios from 'axios'

const service = axios.create({
  responseType: 'arraybuffer'
})

service.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('tokenStr')
  return config
}, error => {
  console.log(error)
})
/**
 * @name:二进制码转为字符串
 * @test:
 * @msg:
 * @param {*} unitArray
 * @return {*}
 */
const unintToString = function(unitArray) {
  // eslint-disable-next-line no-unused-vars
  const encodedString = String.fromCharCode.apply(undefined, new Uint8Array(unitArray))
  // @ts-ignore
  const decodedString = decodeURIComponent(encodedString)

  return JSON.parse(decodedString)
}
service.interceptors.response.use(res => {
  const headers = res.headers
  const reg = RegExp(/aplication\/json/)
  if (headers['content-type'].match(reg)) {
    res.data = unintToString(res.data)
  } else {
    const jsFileDownload = require('js-file-download')
    let fileName = headers['content-disposition'].split(';')[1].split('filename=')[1]
    const contentType = headers['content-type']
    fileName = decodeURIComponent(fileName)
    // @ts-ignore
    jsFileDownload(res.data, fileName, contentType)
  }
}, error => {
  console.log(error)
})

const base = ''
export const downloadRequest = (url, params) => {
  return service({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}

export default service
