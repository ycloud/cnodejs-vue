import api from '@/api'
import * as types from '../mutation-types'

const state = {
  hasMore: true,
  list: [],
  details: {},
  page: 1
}

const getters = {
  topics: state => state
}

const mutations = {
  [types.UPDATE_TOPIC] (state, topic) {
    state.details[topic.id] = topic
  },
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
  getTopic ({commit, state}, id) {
    let topic = state.details[id]
    if (typeof topic !== 'undefined') return Promise.resolve(topic)
    return api.getTopic(id)
    .then(topic => {
      commit(types.UPDATE_TOPIC, topic)
      return Promise.resolve(topic)
    })
  },
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
