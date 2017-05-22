<template>
  <div>
    <v-title>{{topic.id ? topic.title : '话题详情加载中...'}}</v-title>
    <md-card v-if="topic.id">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{topic.title}}</div>
          <div class="md-subhead"><router-link :to="'/user/' + topic.author.loginname">{{topic.author.loginname}}</router-link> {{topic.create_at | timeago}}发表
      | {{topic.visit_count}}次浏览</div>
        </md-card-header-text>
      </md-card-header>
      <md-divider></md-divider>
      <md-card-content class="topic-content" v-html="marked(topic.content)">
      </md-card-content>
    </md-card>
    <br>
    <md-card v-if="topic.id">
      <md-subheader>{{topic.reply_count}}回复</md-subheader>
      <md-list class="md-triple-line md-dense replys">
        <md-list-item v-for="reply in topic.replies" :key="reply.id">
          <md-layout md-column>
            <md-layout class="replay-author">
              <md-avatar>
                <router-link :to="'/user/' + reply.author.loginname">
                <img :src="reply.author.avatar_url" :alt="reply.author.loginname">
                </router-link>
              </md-avatar>
              <div class="md-list-text-container">
                <span>
                  <router-link tag="span" :to="'/user/' + reply.author.loginname">
                    {{reply.author.loginname}}
                  </router-link>
                  {{reply.create_at | timeago}}
                  <span class="like">
                    <md-icon>thumb_up</md-icon> <span><template v-if="reply.ups.length">{{reply.ups.length}}</template></span>
                  </span>
                </span>
              </div>
            </md-layout>
            <div class="md-body-2 reply-content" v-html="marked(reply.content)"></div>
          </md-layout>
          <md-divider></md-divider>
        </md-list-item>
      </md-list>
    </md-card>
  </div>
</template>

<script>
import marked from 'marked'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      topic: {
        author: {},
        content: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    let id = to.params.id
    if (/^[a-z\d]{24}$/i.test(id)) {
      next(vm => {
        vm.getTopic(id)
          .then(topic => {
            vm.topic = topic
          })
          .catch(error => {
            error !== 400 || vm.$router.replace('/404')
          })
      })
    } else {
      next({
        path: '/404',
        replace: true
      })
    }
  },
  methods: {
    ...mapActions([
      'getTopic'
    ]),
    marked
  }
}
</script>

<style scoped>
.md-list.md-dense .md-list-item .md-list-item-container .md-avatar{margin-right:16px;}
.replay-author{
  align-items: center;
  padding-top: 16px;
}
.like{
  float: right;
  line-height: 18px;
}
.like > span{
  display: inline-block;
  width: 16px;
}
.md-icon{
  font-size: 16px;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  margin-top: -3px;
}
.topic-content,
.reply-content{
  word-break: break-all;
}
</style>
