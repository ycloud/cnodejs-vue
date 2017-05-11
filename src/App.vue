<template>
  <md-layout md-column md-gutter id="app">
    <md-toolbar class="md-dense">
      <h2 class="md-title">cnodejs vue share.la</h2>
      <div class="md-subheading">
        <router-link v-for="nav in navs" :to="nav.to" class="has-ripple" :key="nav.to"><md-ink-ripple />{{nav.text}}</router-link>
      </div>
    </md-toolbar>
    <md-bottom-bar>
      <md-bottom-bar-item v-for="nav in navs" :md-icon="nav.icon" :key="nav.to" @click.native="$router.push(nav.to)">{{nav.text}}</md-bottom-bar-item>
    </md-bottom-bar>
    <md-layout>
      <router-view @scroll.native="scroll" class="wrap" ref="wrap"></router-view>
    </md-layout>
    <md-progress v-if="loading" class="loading" md-indeterminate></md-progress>
    <md-dialog-alert :md-content="error || '出错了！'" md-ok-text="知道了" ref="alert"></md-dialog-alert>
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
          text: '首页',
          to: '/'
        },
        {
          icon: 'favorite',
          text: '收藏',
          to: '/collect'
        },
        {
          icon: 'notifications',
          text: '消息',
          to: '/message'
        },
        {
          icon: 'person',
          text: '我',
          to: '/m'
        }
      ]
    }
  },
  computed: mapGetters([
    'error', 'loading'
  ]),
  watch: {
    error (error) {
      !error || this.$refs.alert.open()
    },
    $route () {
      this.$refs.wrap.$el.scrollTop = 0
    }
  },
  methods: {
    close () {
      let self = this
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        self.$store.commit('SET_ERROR', '')
      }, 80)
    },
    scroll (event) {
      let state = history.state || {}
      state.scrollTop = event.target.scrollTop
      history.replaceState(state, null)
    },
    popstate (event) {
      if (event.state && event.state.scrollTop) {
        this.$refs.wrap.$el.scrollTop = event.state.scrollTop
      }
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
}
#app > .loading{
  position: absolute;
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
.md-subheading .has-ripple.router-link-active{
  color: #fff;
}
.md-bottom-bar{
  order: 9;
  z-index: 1;
}
.md-bottom-bar + div{
  width: 100%;
  height: calc(100% - 56px);
}
.wrap{
  flex: 1;
  overflow-y: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
@media (min-width: 768px){
  .md-toolbar{
    display: flex;
  }
  .md-bottom-bar{
    display: none;
  }
  .md-bottom-bar + div{
    height: calc(100% - 64px);
  }
}
</style>
