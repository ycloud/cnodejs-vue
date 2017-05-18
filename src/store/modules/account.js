import api from '@/api'
import * as types from '../mutation-types'

const state = {
  loginname: ''
}

const getters = {
  loginname: state => state.loginname
}

const mutations = {
  [types.SET_ACCOUNT] (state, account) {
    Object.assign(state, account)
  }
}

const actions = {
  sign ({commit}, token) {
    return api.postToken(token)
    .then(account => {
      commit(types.SET_TOKEN, token)
      commit(types.SET_ACCOUNT, account)
    })
  },
  signout ({commit}, token) {
    commit(types.SET_TOKEN, '')
    commit(types.SET_ACCOUNT, {
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
