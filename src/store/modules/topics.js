import api from '@/api'
import * as types from '../mutation-types'

function newTab (data) {
  return Object.assign({
    hasMore: true,
    list: [],
    loading: false,
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
  tabs: state => state.tabs,
  topics: state => state.tabs.find(tab => tab.id === state.tab)
}

const mutations = {
  [types.SET_TOPICS_TAB] (state, tab) {
    state.tab = tab
  },
  [types.UPDATE_TOPIC] (state, topic) {
    state.details[topic.id] = topic
  },
  [types.UPDATE_TOPICS] (state, data) {
    let topics = state.tabs.find(tab => tab.id === data.tab)
    if (data.topics.length < 40 || topics.page === 99) {
      topics.hasMore = false
    } else {
      topics.page ++
    }
    topics.list = topics.list.concat(data.topics)
  },
  [types.TOGGLE_TOPICS_LOADING] (state, data) {
    let topics = state.tabs.find(tab => tab.id === data.tab)
    topics.loading = data.loading
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
    if (!getters.topics.hasMore) return Promise.resolve('没有更多数据了！')
    if (getters.topics.loading) return Promise.resolve('正在加载中！')
    let data = {
      page: getters.topics.page
    }
    let tab = getters.tab
    if (tab !== 'all') data.tab = tab
    commit(types.TOGGLE_TOPICS_LOADING, {
      tab,
      loading: true
    })
    return api.getTopics(data)
    .then(topics => {
      commit(types.UPDATE_TOPICS, {
        tab,
        topics
      })
      commit(types.TOGGLE_TOPICS_LOADING, {
        tab,
        loading: false
      })
    })
    .catch(() => {
      commit(types.TOGGLE_TOPICS_LOADING, {
        tab,
        loading: false
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
