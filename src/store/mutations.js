import * as types from './mutation-types'

export default {
  [types.SET_ERROR] (state, error) {
    state.error = error
  },
  [types.TOGGLE_LOADING] (state, loading) {
    state.loading = typeof loading !== 'undefined' ? loading : !state.loading
  }
}
