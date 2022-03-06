/*
 * @Description:
 * @Author: longxq
 * @Date: 2022-02-23 16:44:56
 * @LastEditTime: 2022-03-05 22:01:17
 * @LastEditors: longxq
 * @Reference:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Login',
  component: Login,
  hidden: true
}, {
  path: '*',
  redirect: '/'
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
