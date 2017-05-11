import api from '@/api'
import * as types from '../mutation-types'

const state = {
  list: {}
}

const mutations = {
  [types.UPDATE_USERS] (state, user) {
    state.list[user.loginname] = user
  }
}

const actions = {
  getUser ({commit, state}, loginname) {
    let user = state.list[loginname]
    if (typeof user !== 'undefined') return Promise.resolve(user)
    return api.getUser(loginname)
    .then(user => {
      commit(types.UPDATE_USERS, user)
      return user
    })
  }
}

export default {
  state,
  actions,
  mutations
}
