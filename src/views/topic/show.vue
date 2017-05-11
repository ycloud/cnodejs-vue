<template>
  <div>
    <div v-if="!topic.id" class="spinner-loading">
      <br>
      <md-spinner md-indeterminate></md-spinner>
    </div>
    <div v-else><div v-title :data-title="topic.title" v-html="marked(topic.content)"></div></div>
  </div>
</template>

<script>
import marked from 'marked'
import mixin from '@/components/mixin'
import store from '@/store'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      topic: {
        title: '',
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
            console.error(error)
            vm.$router.replace(from.fullPath)
          })
      })
    } else {
      store.commit('SET_ERROR', '非法操作')
      next(false)
    }
  },
  methods: {
    ...mapActions([
      'getTopic'
    ]),
    marked
  },
  mixins: [mixin]
}
</script>
