import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    currentUser: 'null',
  },
  mutations: {
    LOGIN(state) {
      state.login = true;
    },
    CURRENTUSER(state, payload) {
      state.currentUser = payload.user;
    },
  },
  actions: {
    setLogin({ commit }) {
      commit({
        type: 'LOGIN',
      });
    },
    setCurrentUser({ commit }, userId) {
      commit({
        type: 'CURRENTUSER',
        user: userId,
      });
    },
  },
  getters: {
    getCurrentUser(state) {
      console.log(9999)
      return state.currentUser;
    },
  },
})
