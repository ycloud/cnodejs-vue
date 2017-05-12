import * as types from './mutation-types'

export default {
  [types.SET_ERROR] (state, error) {
    state.error = error
  },
  [types.SET_MODULE] (state, module) {
    state.module = module
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.TOGGLE_LOADING] (state, loading) {
    state.loading = typeof loading !== 'undefined' ? loading : !state.loading
  }
}
