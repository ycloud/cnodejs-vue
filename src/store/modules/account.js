import api from '@/api'
import * as types from '../mutation-types'

const state = {
  user: {
    loginname: ''
  }
}

const getters = {
  loginname: state => state.user.loginname
}

const mutations = {
  [types.UPDATE_USER] (state, user) {
    state.user = user
  }
}

const actions = {
  sign ({commit}, token) {
    return api.postToken(token)
    .then(user => {
      commit(types.SET_TOKEN, token)
      commit(types.UPDATE_USER, user)
    })
  },
  signout ({commit}, token) {
    commit(types.SET_TOKEN, '')
    commit(types.UPDATE_USER, {
      loginname: ''
    })
  }
}

export default {
  getters,
  state,
  actions,
  mutations
}
