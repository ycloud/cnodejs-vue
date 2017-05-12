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
  sign ({commit, state}, token) {
    return api.postToken(token)
    .then(user => {
      commit(types.SET_TOKEN, token)
      commit(types.UPDATE_USER, user)
    })
  }
}

export default {
  getters,
  state,
  actions,
  mutations
}
