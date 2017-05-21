<template>
  <md-list @click.native.self="showId = null">
    <v-title>收到的消息</v-title>
    <md-list-item v-for="message in messages" :key="message.id" :class="{active: showId === message.id}">
      <md-card md-with-hover @click.native="showId = message.id">
        <md-ink-ripple />
        <md-card-header>
          <div class="md-body-1"><router-link :to="'/user/' + message.author.loginname">{{message.author.loginname}}</router-link> 在话题 <router-link :to="'/topic/' + message.topic.id">{{message.topic.title}}</router-link> 中@了你</div>
        </md-card-header>
        <md-card-content v-show="showId === message.id" v-html="marked(message.reply.content)">
        </md-card-content>
      </md-card>
    </md-list-item>
  </md-list>
</template>

<script>
import marked from 'marked'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showId: null
    }
  },
  computed: mapGetters([
    'messages'
  ]),
  created () {
    if (this.messages.length === 0) this.getMessages()
  },
  methods: {
    ...mapActions([
      'getMessages'
    ]),
    marked
  }
}
</script>

<style scoped>
.md-list{
  padding: 0;
}
.md-list .md-list-item{
  transition: margin .3s cubic-bezier(.55,0,.55,.2);
}
.md-list .md-card-content{
  padding-bottom: 0;
  margin-top: -14px;
  color: rgba(0, 0, 0, .54);
}
.md-list .active{
  margin: 16px 0;
}
.md-card{
  flex: 1;
  margin: 0 -16px;
}
</style>
