import api from '@/api'
import * as types from '../mutation-types'

const state = {
  list: []
}

const getters = {
  collects: state => state.list
}

const mutations = {
  [types.UPDATE_COLLECTS] (state, collects) {
    state.list = state.list.concat(collects)
  }
}

const actions = {
  getCollects ({commit, getters}) {
    return api.getCollects(getters.loginname)
    .then(collects => {
      commit(types.UPDATE_COLLECTS, collects)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
