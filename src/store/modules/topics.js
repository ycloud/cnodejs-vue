import api from '@/api'
import * as types from '../mutation-types'

const state = {
  hasMore: true,
  list: [],
  page: 1
}

const getters = {
  topics: state => state.list
}

const mutations = {
  [types.UPDATE_TOPICS] (state, topics) {
    if (topics.length < 40) {
      state.hasMore = false
    } else {
      state.page ++
    }
    state.list = state.list.concat(topics)
  }
}

const actions = {
  getTopics ({commit, state}) {
    if (state.hasMore === false) return Promise.resolve('没有更多数据了！')
    return api.getTopics({
      page: state.page
    })
    .then(topics => {
      commit(types.UPDATE_TOPICS, topics)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
