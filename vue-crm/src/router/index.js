import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => {require(['../components/login.vue'],resolve)}
    },
    {
      path: '/main',
      component: resolve => {require(['../components/main.vue'],resolve)},
      redirect:'/main/clientShow',
      children:[
        {
          path:'clientShow',
          name:'clientShow_index',
          component:resolve => {require(['../components/clientServer/mainClientContent.vue'],resolve)}
        },
        {
          path:'linkmanShow',
          name:'linkmanShow_index',
          component:resolve => {require(['../components/linkman/mainLinkmanContent.vue'],resolve)}
        }
      ]
    },
    {
      path: '/createNewClient',
      component: resolve => {require(['../components/clientServer/createNewClient.vue'],resolve)},
      name: 'createNew'
    },
    {
      path: '/mapExpand',
      component: resolve => {require(['../components/mapExpand.vue'],resolve)},
    },
    {
      path: '*',
      component: resolve => {require(['../components/404.vue'],resolve)}
    }
  ]
})
export default router
