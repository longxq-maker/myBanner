import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入elementui
import element from './element/index'
Vue.use(element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
