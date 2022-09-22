import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    user: {}
  },
  getters: {},
  mutations: {
    setIsLogin(state, flag) {
      state.isLogin = flag
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {},
  modules: {}
})
