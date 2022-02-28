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

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const getToken = window.sessionStorage.getItem('tokenStr')
  console.log(getToken)
  if (!getToken) {
    // 用户未登录
    console.log('用户未登录')
    if (to.path === '/') {
      next()
    } else {
      console.log('开始重定向')
      console.log(to.path)
      next('/?redirect=' + to.path)
    }
  } else {
    // 初始化菜单
    initMenu(router, store)
    // 判断用户信息是否存在
    if (!window.sessionStorage.getItem('user')) {
      // 用户信息不存在
      // 获取用户信息
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          // console.log(path)
          next()
        }
      })
    } else {
      // 用户信息存在
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
