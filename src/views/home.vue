<template>
  <md-list class="md-triple-line">
    <md-list-item v-for="topic in topics.list" :key="topic.id">
      <md-avatar>
        <img :src="topic.author.avatar_url" :alt="topic.author.loginname">
      </md-avatar>
      <div class="md-list-text-container">
        <span>{{topic.title}}</span>
        <span>{{topic.author.loginname}}</span>
      </div>
      <div class="md-list-action">
        {{topic.reply_count}}/{{topic.visit_count}}
      </div>
      <md-divider></md-divider>
    </md-list-item>
    <md-list-item v-if="topics.hasMore" class="loading">
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
.loading .md-spinner{
  margin: auto;
}
</style>
