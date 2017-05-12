import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  base: '/cnodejs/vue/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {module: 'Home'}
    },
    {
      path: '/topic/:id',
      name: 'Topic',
      component (resolve) {
        require(['@/views/show'], resolve)
      },
      meta: {module: 'Home'}
    },
    {
      path: '/user/:loginname',
      name: 'User',
      component (resolve) {
        require(['@/views/user'], resolve)
      },
      meta: {module: 'Home'}
    },
    {
      path: '/sign',
      name: 'Sign',
      component (resolve) {
        require(['@/views/sign'], resolve)
      },
      meta: {
        module: 'Home',
        requiresAuth: false
      }
    },
    {
      path: '/collect',
      name: 'Collect',
      component (resolve) {
        require(['@/views/collect'], resolve)
      },
      meta: {
        module: 'Collect',
        requiresAuth: true
      }
    },
    {
      path: '/message',
      name: 'Message',
      component (resolve) {
        require(['@/views/message'], resolve)
      },
      meta: {
        module: 'Message',
        requiresAuth: true
      }
    },
    {
      path: '/m',
      name: 'Me',
      component (resolve) {
        require(['@/views/user'], resolve)
      },
      meta: {
        module: 'Me',
        requiresAuth: true
      }
    }
  ]
})
