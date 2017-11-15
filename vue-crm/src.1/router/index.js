import Vue from 'vue'
import Router from 'vue-router'
import createNew from '@/components/createNew'
import Main from '@/components/main'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/createNew',
      component: createNew
    }
  ]
})
export default router
