import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登录用户数据
    user: JSON.parse(window.localStorage.getItem('edu-mobile-user') || null)
  },
  mutations: {
    // 用于修改 user
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 将数据存储到本地中，注意本地无法存储对象
      window.localStorage.setItem('edu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
