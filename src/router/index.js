import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/topic/:id',
      name: 'Topic',
      component (resolve) {
        require(['@/views/show'], resolve)
      }
    },
    {
      path: '/user/:loginname',
      name: 'User',
      component (resolve) {
        require(['@/views/user'], resolve)
      }
    }
  ]
})
