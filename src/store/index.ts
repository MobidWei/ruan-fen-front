import { createStore } from 'vuex'
import { ref } from "vue"

export default createStore({
  state: {
    token: "",
    userName: "",
    userId: "",
    hasLogin: false,
  },
  getters: {
  },
  mutations: {
    setToken(state, inputToken) {
      state.token = inputToken;
    },
    setUserName(state, inputName) {
      console.log(inputName);
      state.userName = inputName;
    },
    setUserId(state, inputId) {
      state.userId = inputId;
    },
    setLogin(state, hasLogin) {
      state.hasLogin = hasLogin;
    }
  },
  actions: {
    commitSetToken({ commit }, inputToken) {
      commit('setToken', inputToken);
    },
    commitSetUserName({ commit }, inputName) {
      commit('setUserName', inputName);
    },
    commitSetUserId({ commit }, inputId) {
      commit('setUserId', inputId);
    },
    commitLogin({ commit }, loginSit) {
      commit('setLogin', loginSit);
    }
  },
  modules: {
  }
})
