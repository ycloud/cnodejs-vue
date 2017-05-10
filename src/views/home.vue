<template>
  <md-list class="md-triple-line" v-title data-title="cnodejs vue share.la">
    <md-list-item class="has-ripple" v-for="topic in topics.list" :key="topic.id">
      <md-ink-ripple />
      <md-avatar>
        <router-link :to="'/user/' + topic.author.loginname">
        <img :src="topic.author.avatar_url" :alt="topic.author.loginname">
        </router-link>
      </md-avatar>
      <div class="md-list-text-container">
        <router-link :to="'/topic/' + topic.id" tag="span">{{topic.title}}</router-link>
        <router-link :to="'/user/' + topic.author.loginname" tag="span">{{topic.author.loginname}}</router-link>
      </div>
      <div class="md-list-action">
        <router-link :to="'/topic/' + topic.id" tag="span">
          {{topic.reply_count}}/{{topic.visit_count}}
          <br>
          {{topic.last_reply_at | fromNow}}
        </router-link>
      </div>
      <md-divider></md-divider>
    </md-list-item>
    <md-list-item class="spinner-loading">
      <md-spinner md-indeterminate></md-spinner>
    </md-list-item>
  </md-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters([
    'topics', 'loading'
  ]),
  created () {
    if (this.topics.list.length === 0) this.getTopics()
  },
  methods: {
    ...mapActions([
      'getTopics'
    ]),
    scroll (event) {
      if (this.loading ||
        event.target.scrollHeight - event.target.offsetHeight - event.target.scrollTop > 200) return
      this.getTopics()
    }
  },
  mounted () {
    if (this.topics.hasMore) this.$el.addEventListener('scroll', this.scroll)
  },
  beforeDestroy () {
    this.$el.removeEventListener('scroll', this.scroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-triple-line{
  padding: 0;
}
.md-list-item .md-list-item-container .md-avatar{
  margin-right: 16px;
}
.md-list-item div.md-list-text-container{
  flex: 1;
}
.md-list-action{
  width: 86px;
  text-align: right;
}
@media (min-width: 768px) {
  .md-list-action{
    width: 100px;
  }
}
</style>
