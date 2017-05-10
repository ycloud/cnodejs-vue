<template>
  <md-layout md-column md-gutter id="app">
    <md-toolbar class="md-dense">
      <h2 class="md-title">cnodejs vue share.la</h2>
      <div class="md-subheading">
        <router-link to="/" exact class="has-ripple"><md-ink-ripple />首页</router-link>
        <router-link to="/collect" class="has-ripple"><md-ink-ripple />收藏</router-link>
        <router-link to="/message" class="has-ripple"><md-ink-ripple />消息</router-link>
        <router-link to="/m" class="has-ripple"><md-ink-ripple />我</router-link>
      </div>
    </md-toolbar>
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="home" md-active>首页</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="favorite">收藏</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="notifications">消息</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="person">我</md-bottom-bar-item>
    </md-bottom-bar>
    <md-layout>
      <router-view class="wrap"></router-view>
    </md-layout>
    <md-progress v-if="loading" class="loading" md-indeterminate></md-progress>
    <md-dialog-alert :md-content="error || '出错了！'" md-ok-text="知道了" ref="alert"></md-dialog-alert>
  </md-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters([
    'error', 'loading'
  ]),
  watch: {
    error (error) {
      !error || this.$refs.alert.open()
    }
  },
  methods: {
    close () {
      let self = this
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        self.$store.commit('SET_ERROR', '')
      }, 80)
    }
  }
}
</script>

<style scoped>
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
#app > .loading {
  position: absolute;
}
.md-theme-default.md-progress {
  background: rgba(255, 255, 255, 0.38);
}
#app .md-title {
  flex: 1;
}
.md-subheading {
  display: none;
}
.md-subheading .has-ripple {
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
.wrap{
  flex: 1;
  overflow-y: auto;
}
@media (min-width: 768px) {
  .md-subheading {
    display: block;
  }
  .md-bottom-bar {
    display: none;
  }
}
</style>
