const scroll = event => {
  let state = history.state || {}
  state.scrollTop = event.target.scrollTop
  history.replaceState(state, null)
}

export default {
  mounted () {
    this.$el.addEventListener('scroll', scroll)
  },
  beforeDestroy () {
    this.$el.removeEventListener('scroll', scroll)
  }
}
