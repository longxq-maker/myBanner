import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
// 引入elementui
import element from './element/index'
// 引入fontawesome
import 'font-awesome/css/font-awesome.min.css'
// 引入axios拦截请求
// import './api/index'
// 配置axios默认url
// axios.defaults.baseURL = 'http://localhost:8081'
// Vue.prototype.$http = axios

Vue.use(element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
