// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import mdCore from 'vue-material/dist/components/mdCore'
import mdAvatar from 'vue-material/dist/components/mdAvatar'
import mdBackdrop from 'vue-material/dist/components/mdBackdrop'
import mdBottomBar from 'vue-material/dist/components/mdBottomBar'
import mdButton from 'vue-material/dist/components/mdButton'
import mdCard from 'vue-material/dist/components/mdCard'
import mdDialog from 'vue-material/dist/components/mdDialog'
import mdDivider from 'vue-material/dist/components/mdDivider'
import mdIcon from 'vue-material/dist/components/mdIcon'
import mdInputContainer from 'vue-material/dist/components/mdInputContainer'
import mdLayout from 'vue-material/dist/components/mdLayout'
import mdList from 'vue-material/dist/components/mdList'
import mdProgress from 'vue-material/dist/components/mdProgress'
import mdSpinner from 'vue-material/dist/components/mdSpinner'
import mdSubheader from 'vue-material/dist/components/mdSubheader'
import mdTabs from 'vue-material/dist/components/mdTabs'
import mdToolbar from 'vue-material/dist/components/mdToolbar'
import mdWhiteframe from 'vue-material/dist/components/mdWhiteframe'
import router from './router'
import store from './store'
import timeago from 'timeago.js'
import App from './App'
import Title from './components/Title'
import Vue from 'vue'
import Vuex from 'vuex'
import 'vue-material/dist/vue-material.css'
import './assets/styles/base.css'

Vue.config.productionTip = false

Vue.use(mdCore)
Vue.use(mdAvatar)
Vue.use(mdBackdrop)
Vue.use(mdBottomBar)
Vue.use(mdButton)
Vue.use(mdCard)
Vue.use(mdDialog)
Vue.use(mdDivider)
Vue.use(mdIcon)
Vue.use(mdInputContainer)
Vue.use(mdLayout)
Vue.use(mdList)
Vue.use(mdProgress)
Vue.use(mdSpinner)
Vue.use(mdSubheader)
Vue.use(mdTabs)
Vue.use(mdToolbar)
Vue.use(mdWhiteframe)
Vue.use(Vuex)

Vue.component('VTitle', Title)

const timeagoFormat = timeago().format
Vue.filter('timeago', time => timeagoFormat(time, 'zh_CN'))

router.beforeEach((to, from, next) => {
  store.commit('SET_MODULE', to.meta.module)
  if (to.matched.some(record => record.meta.requiresAuth === true)) {
    if (store.getters.token === '') {
      next({
        path: '/sign',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
    if (store.getters.token !== '') {
      next(to.query.redirect || '/m')
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
