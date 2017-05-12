import api from '@/api'
import * as types from '../mutation-types'

const state = {
  list: []
}

const getters = {
  messages: state => state.list
}

const mutations = {
  [types.UPDATE_MESSAGES] (state, messages) {
    state.list = state.list.concat(messages)
  }
}

const actions = {
  getMessages ({commit, getters}) {
    return api.getMessages(getters.token)
    .then(data => {
      commit(types.UPDATE_MESSAGES, data.hasnot_read_messages)
      commit(types.UPDATE_MESSAGES, data.has_read_messages)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
