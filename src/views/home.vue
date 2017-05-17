<template>
  <md-layout md-column v-title :data-title="title">
    <md-tabs md-fixed ref="tab" @click.native="switchTab">
      <md-tab v-for="t in tabs" :id="t.id" :md-active="tab === t.id" :key="t.id" :md-label="t.label">
      </md-tab>
    </md-tabs>
    <md-list @scroll.native="scroll" ref="list" class="md-triple-line">
      <md-list-item v-for="topic in topics.list" :key="tab + topic.id">
        <md-avatar>
          <router-link :to="'/user/' + topic.author.loginname">
          <img :src="topic.author.avatar_url" :alt="topic.author.loginname">
          </router-link>
        </md-avatar>
        <div class="md-list-text-container">
          <router-link :to="'/topic/' + topic.id" tag="span">{{topic.title}}</router-link>
          <router-link :to="'/topic/' + topic.id" tag="span">{{topic.reply_count}}/{{topic.visit_count}}</router-link>
        </div>
        <div class="md-list-action md-body-1">
          <router-link :to="'/topic/' + topic.id" tag="span">
          {{topic.last_reply_at | timeago}}
          </router-link>
        </div>
        <md-divider></md-divider>
      </md-list-item>
      <md-list-item v-if="topics.hasMore">
        <md-spinner md-indeterminate></md-spinner>
      </md-list-item>
    </md-list>
  </md-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setTab(to.query.tab || 'all')
      if (vm.topics.list.length === 0) vm.getTopics()
    })
  },
  computed: {
    ...mapGetters([
      'tab', 'tabs', 'topics'
    ]),
    title () {
      if (this.tab === 'all') return 'cnodejs vue share.la'
      if (this.tab === 'good') return '精华话题'
      return this.tabs.find(tab => tab.id === this.tab).label + '版块'
    }
  },
  methods: {
    ...mapActions([
      'getTopics', 'setTab'
    ]),
    scroll (event) {
      clearTimeout(this.timer)
      let target = event.target
      this.timer = setTimeout(() => {
        let state = history.state || {}
        state.homeScrollTop = target.scrollTop
        history.replaceState(state, null)
        if (target.scrollTop === 0 ||
          target.scrollHeight - target.offsetHeight - target.scrollTop > 200) return
        this.getTopics()
      }, 200)
    },
    switchTab () {
      let tab = this.$refs.tab.$data.activeTab
      tab = tab !== 'all' ? {tab} : ''
      this.$router.push({
        query: tab
      })
    }
  },
  watch: {
    $route (route) {
      this.setTab(route.query.tab || 'all')
      if (this.topics.list.length === 0) this.getTopics()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-tabs{
  height: 48px;
  overflow: hidden;
}
.md-list{
  flex: 1;
  width: 100%;
  padding: 0;
  overflow-y: auto;
}
.md-list-item .md-list-item-container .md-avatar{
  margin-right: 16px;
}
.md-list-item div.md-list-text-container{
  flex: 1;
}
.md-list-text-container>:first-child{
  font-size: 14px;
}
.wrap .md-list .md-list-item .md-list-action{
  width: 62px;
  margin: 0 0 0 10px;
  text-align: right;
  white-space: nowrap;
  color: rgba(0,0,0,.54);
}
.md-spinner{
  margin: auto;
}
@media (min-width: 768px) {
  .md-list-action{
    width: auto;
  }
}
</style>
