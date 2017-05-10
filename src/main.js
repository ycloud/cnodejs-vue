// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import router from './router'
import store from './store'
import App from './App'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuex from 'vuex'
import 'vue-material/dist/vue-material.css'
import './assets/styles/base.css'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
