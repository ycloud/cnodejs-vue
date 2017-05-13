<template>
  <md-layout md-column id="app">
    <md-toolbar v-if="module !== 'Error'" @touchmove.native.prevent class="md-dense">
      <h2 class="md-title">cnodejs vue share.la</h2>
      <div class="md-subheading">
        <router-link v-for="nav in navs" :to="nav.to" class="has-ripple" :key="nav.to" :active="module === nav.module"><md-ink-ripple />{{nav.label}}</router-link>
      </div>
    </md-toolbar>
    <md-bottom-bar v-if="module !== 'Error'">
      <md-bottom-bar-item v-for="nav in navs" :md-icon="nav.icon" :md-active="module === nav.module" :key="nav.to" @click.native="$router.push(nav.to)">{{nav.label}}</md-bottom-bar-item>
    </md-bottom-bar>
    <router-view @click.native="link" @scroll.native="scroll" class="wrap" ref="wrap"></router-view>
    <md-progress v-if="loading" class="loading" md-indeterminate></md-progress>
    <md-dialog-alert :md-content="error || '出错了！'" md-ok-text="知道了" ref="alert" @close="close"></md-dialog-alert>
  </md-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      navs: [
        {
          icon: 'home',
          module: 'Home',
          label: '话题',
          to: '/'
        },
        {
          icon: 'favorite',
          module: 'Collect',
          label: '收藏',
          to: '/collect'
        },
        {
          icon: 'notifications',
          module: 'Message',
          label: '消息',
          to: '/message'
        },
        {
          icon: 'person',
          module: 'Me',
          label: '我',
          to: '/m'
        }
      ]
    }
  },
  computed: mapGetters([
    'error', 'module', 'loading'
  ]),
  watch: {
    error (error) {
      !error || this.$refs.alert.open()
    },
    $route () {
      let wrap = this.$refs.wrap
      if (wrap) {
        wrap.$el.scrollTop = 0
        if (wrap.$refs.list) wrap.$refs.list.$el.scrollTop = 0
      }
    }
  },
  methods: {
    close () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$store.commit('SET_ERROR', '')
      }, 192)
    },
    link (event) {
      let href = event.target.getAttribute('href')
      if (href === null) return
      if (href.startsWith('/user/')) {
        event.preventDefault()
        this.$router.push(href)
      }
      if (!href.startsWith('/')) {
        event.preventDefault()
        open(href)
      }
    },
    popstate (event) {
      let state = event.state
      if (state === null) return
      if (state.scrollTop) this.$refs.wrap.$el.scrollTop = state.scrollTop
      if (state.homeScrollTop) this.$refs.wrap.$refs.list.$el.scrollTop = state.homeScrollTop
    },
    scroll (event) {
      clearTimeout(this.timer)
      let target = event.target
      this.timer = setTimeout(() => {
        let state = history.state || {}
        state.scrollTop = target.scrollTop
        history.replaceState(state, null)
      }, 200)
    }
  },
  mounted () {
    window.addEventListener('popstate', this.popstate)
  },
  beforeDestroy () {
    window.removeEventListener('popstate', this.popstate)
  }
}
</script>

<style scoped>
#app{
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
#app > .loading{
  position: absolute;
  top: 0;
  z-index: 9;
}
.md-theme-default.md-progress{
  background: rgba(255, 255, 255, 0.38);
}
#app .md-title{
  flex: 1;
}
.md-toolbar{
  display: none;
}
.md-subheading .has-ripple{
  padding: 20px;
  display: inline-block;
  position: relative;
  color: #ddd;
}
.md-subheading .has-ripple:hover{
  color: #fff;
}
.md-subheading a[active]{
  color: #fff;
}
.md-bottom-bar{
  order: 9;
  z-index: 1;
}
.wrap{
  flex: 1;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 56px);
}
@media (min-width: 768px){
  .md-toolbar{
    display: flex;
  }
  .md-bottom-bar{
    display: none;
  }
  .wrap{
    height: calc(100% - 64px);
  }
}
</style>
