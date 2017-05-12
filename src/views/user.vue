<template>
  <div>
    <md-card v-if="user.loginname" v-title :data-title="user.loginname + '的个人主页'">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{user.loginname}}</div>
          <div class="md-subhead">{{user.score}}积分 注册于 {{user.create_at | fromNow}}</div>
        </md-card-header-text>
        <md-card-media>
          <md-avatar class="md-large">
            <img :src="user.avatar_url
            " :alt="user.loginname">
          </md-avatar>
        </md-card-media>
      </md-card-header>
    </md-card>
    <br>
    <md-card v-if="user.loginname">
      <md-subheader>最近创建的话题</md-subheader>
      <md-card-content v-if="user.recent_topics.length === 0">无话题</md-card-content>
      <md-list class="md-triple-line md-dense">
        <md-list-item v-for="topic in user.recent_topics" :key="topic.id">
          <div class="md-list-text-container">
            <router-link :to="'/topic/' + topic.id" tag="span">{{topic.title}}</router-link>
          </div>
          <md-divider></md-divider>
        </md-list-item>
      </md-list>
    </md-card>
    <br>
    <md-card v-if="user.loginname">
      <md-subheader>最近参与的话题</md-subheader>
      <md-card-content v-if="user.recent_replies.length === 0">无话题</md-card-content>
      <md-list class="md-triple-line md-dense">
        <md-list-item v-for="topic in user.recent_replies" :key="topic.id">
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
    </md-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      user: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getUser(to.name === 'Me' ? vm.loginname : to.params.loginname)
        .then(user => {
          vm.user = user
        })
        .catch(error => {
          console.error(error)
          vm.$router.replace(from.fullPath)
        })
    })
  },
  computed: mapGetters([
    'loginname'
  ]),
  watch: {
    $route () {
      this.$route.name === 'Me' || this.getUser(this.$route.params.loginname)
        .then(user => {
          this.user = user
        })
        .catch(error => {
          console.error(error)
          this.$router.back()
        })
    }
  },
  methods: mapActions([
    'getUser'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
