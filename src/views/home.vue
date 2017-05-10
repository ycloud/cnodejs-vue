<template>
  <md-list class="md-triple-line">
    <md-list-item v-for="topic in topics" :key="topic.id">
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
  </md-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters([
    'topics'
  ]),
  created () {
    if (this.topics.length === 0) this.getTopics()
  },
  methods: mapActions([
    'getTopics'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-triple-line{
  padding: 0;
}
</style>
