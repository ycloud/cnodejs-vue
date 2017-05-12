import api from '@/api'
import * as types from '../mutation-types'

function newTab (data) {
  return Object.assign({
    hasMore: true,
    list: [],
    page: 1
  }, data)
}

const state = {
  tab: 'all',
  tabs: [
    newTab({
      id: 'all',
      label: '全部'
    }),
    newTab({
      id: 'good',
      label: '精华'
    }),
    newTab({
      id: 'share',
      label: '分享'
    }),
    newTab({
      id: 'ask',
      label: '问答'
    }),
    newTab({
      id: 'job',
      label: '招聘'
    })
  ],
  details: {}
}

const getters = {
  tab: state => state.tab,
  topics: state => state.tabs.find(tab => {
    return tab.id === state.tab
  })
}

const mutations = {
  [types.SET_TOPICS_TAB] (state, tab) {
    state.tab = tab
  },
  [types.UPDATE_TOPIC] (state, topic) {
    state.details[topic.id] = topic
  },
  [types.UPDATE_TOPICS] (state, data) {
    let tabTopics = state.tabs.find(tab => {
      return tab.id === data.tab
    })
    if (data.topics.length < 40 || tabTopics.page === 99) {
      tabTopics.hasMore = false
    } else {
      tabTopics.page ++
    }
    tabTopics.list = tabTopics.list.concat(data.topics)
  }
}

const actions = {
  getTopic ({commit, state}, id) {
    let topic = state.details[id]
    if (typeof topic !== 'undefined') return Promise.resolve(topic)
    return api.getTopic(id)
    .then(topic => {
      commit(types.UPDATE_TOPIC, topic)
      return topic
    })
  },
  getTopics ({commit, getters}) {
    if (getters.topics.hasMore === false) return Promise.resolve('没有更多数据了！')
    let data = {
      page: getters.topics.page
    }
    let tab = getters.tab
    if (tab !== 'all') data.tab = tab
    return api.getTopics(data)
    .then(topics => {
      commit(types.UPDATE_TOPICS, {
        tab,
        topics
      })
    })
  },
  setTab ({commit}, tab) {
    commit(types.SET_TOPICS_TAB, tab)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
