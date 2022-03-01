import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: [],
    currentUser: null,
    isLogin: false,
    token: ''
  },
  mutations: {
    initRoutes(state, data) {
      state.routes = data
    }
  },
  actions: {},
  modules: {}
})
