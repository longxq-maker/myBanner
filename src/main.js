/*
 * @Description:
 * @Author: longxq
 * @Date: 2022-02-23 16:44:56
 * @LastEditTime: 2022-03-06 21:38:28
 * @LastEditors: longxq
 * @Reference:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入初始化样式
// import '../src/assets/css/init.css'
// import axios from 'axios'
// 引入elementui
import element from './element/index'
// 引入fontawesome
import 'font-awesome/css/font-awesome.min.css'
// 引入axios拦截请求
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest
} from './api/index'
import {
  downloadRequest
} from './api/download'
import {
  initMenu
} from './utils/menu'

// 配置axios默认url
// axios.defaults.baseURL = 'http://localhost:8081'
// Vue.prototype.$http = axios

Vue.use(element)
Vue.config.productionTip = false

Vue.prototype.postRequest = postRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.downloadRequest = downloadRequest

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    // 判断用户信息是否存在
    if (!window.sessionStorage.getItem('user')) {
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          // const path = route.query.redirect
          // console.log(path)
          // router.replace((path === '/' || path === undefined) ? '/home' : path)
          next()
        } else {
          router.replace('/')
        }
      })
    } else {
      // 用户信息存在
      next()
    }
  } else {
    // 用户没有登录
    // todo:修复输入路由直接跳转到登录页面
    console.log('用户没有登录')
    if (to.path !== '/') {
      next('/?redirect=' + to.path)
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
