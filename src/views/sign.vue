<template>
  <div class="sign" v-title data-title="登录">
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>Access Token</label>
        <md-input v-model="token" placeholder="Access Token" autofocus required></md-input>
      </md-input-container>
      <md-button class="md-raised md-primary" type="submit">登录</md-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      token: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    let token = localStorage.getItem('token')
    if (token) {
      next(vm => {
        vm.hasLocalToken = true
        vm.sign(token)
          .then(() => {
            vm.$router.replace(vm.$route.query.redirect || '/m')
          })
          .catch(() => {
            vm.hasLocalToken = false
            localStorage.removeItem('token')
          })
      })
    } else {
      next()
    }
  },
  methods: {
    ...mapActions([
      'sign'
    ]),
    submit () {
      if (this.token === '') return this.$store.commit('SET_ERROR', 'Access Token 不能为空！')
      if (!/^[a-z\d\\-]{36}$/i.test(this.token)) return this.$store.commit('SET_ERROR', 'Access Token 格式错误！')
      this.sign(this.token)
        .then(() => {
          localStorage.setItem('token', this.token)
          this.$router.replace(this.$route.query.redirect || '/m')
        })
    }
  }
}
</script>

<style scoped>
.sign{
  padding:30% 32px 0;
}
.md-button[type=submit]{
  display: block;
  width: 100%;
  min-height: 40px;
  margin:6px 0;
  padding-top: 2px;
  line-height: 40px;
  font-size: 16px;
}
</style>
