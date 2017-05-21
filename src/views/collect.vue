<template>
  <md-list class="md-triple-line md-dense">
    <v-title>收藏的话题</v-title>
    <md-list-item v-for="topic in collects" :key="topic.id">
      <md-avatar>
        <router-link :to="'/user/' + topic.author.loginname">
          <img :src="topic.author.avatar_url" :alt="topic.author.loginname">
        </router-link>
      </md-avatar>
      <div class="md-list-text-container">
        <router-link :to="'/topic/' + topic.id" tag="span">{{topic.title}}</router-link>
      </div>
      <md-divider></md-divider>
    </md-list-item>
  </md-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters([
    'collects'
  ]),
  created () {
    if (this.collects.length === 0) this.getCollects()
  },
  methods: mapActions([
    'getCollects'
  ])
}
</script>

