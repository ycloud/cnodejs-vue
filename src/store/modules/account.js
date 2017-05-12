import api from '@/api'
import * as types from '../mutation-types'

const state = {
  user: {}
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
  state,
  actions,
  mutations
}
