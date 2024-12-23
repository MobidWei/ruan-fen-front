import { createStore } from 'vuex'
import { ref } from "vue"

export default createStore({
  state: {
    token: ref(""),
    userName: ref(""),
    userId: ref(""),
    hasLogin: ref(false),
  },
  getters: {
  },
  mutations: {
    setToken(state, inputToken) {
      state.token.value = inputToken;
    },
    setUserName(state, inputName) {
      console.log(inputName);
      state.userName.value = inputName;
    },
    setUserId(state, inputId) {
      state.userId.value = inputId;
    },
    setLogin(state, hasLogin) {
      state.hasLogin.value = hasLogin;
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
