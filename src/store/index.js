import getters from './getters'
import mutations from './mutations'
import topics from './modules/topics'
import users from './modules/users'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    topics,
    users
  },
  mutations,
  state: {
    error: '',
    loading: false
  }
})
