import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '/dist/',
  routes: [
    {
      path: '/',
      component: resolve => {require(['../components/login.vue'],resolve)}
    },
    {
      path: '/main',
      component: resolve => {require(['../components/main.vue'],resolve)},
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
        },
        {
          path:'dataPaneShow',
          name:'dataPane_index',
          component:resolve => {require(['../components/dataPane/mainDataPane.vue'],resolve)},
          children:[
            {
              path:'salesThreadAnalyze',
              name:'salesThreadAnalyze_index',
              component:resolve => {require(['../components/dataPane/salesThreadAnalyze.vue'],resolve)}
            },  
            {
              path:'clientAnalyze',
              name:'clientAnalyze_index',
              component:resolve => {require(['../components/dataPane/clientAnalyze.vue'],resolve)}
            }
          ]
        }
      ]
    },
    {
      path: '/createNewClient',
      component: resolve => {require(['../components/clientServer/createNewClient.vue'],resolve)},
      name: 'createNewClient'
    },
    {
      path: '/createNewLinkman',
      component: resolve => {require(['../components/linkman/createNewLinkman.vue'],resolve)},
      name: 'createNewLinkman'
    },
    {
      path: '/mapExpand',
      component: resolve => {require(['../components/mapExpand.vue'],resolve)},
    },
    {
      path: '*',
      // component: resolve => {require(['../components/404.vue'],resolve)}
      redirect:'/'
    }
  ]
})
export default router
