import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login'

import Test1 from '../views/Test1.vue'
import Test2 from '../views/Test2.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/home',
  name: '导航一',
  component: Home,
  meta: {
    requireAuth: true // 表示进入这个路由需要登录
  },
  children: [{
    path: '/test1',
    name: '选项一',
    component: Test1
  }, {
    path: '/test2',
    name: '选项二',
    component: Test2
  }]
}, {
  path: '/',
  name: 'Login',
  component: Login,
  hidden: true
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
