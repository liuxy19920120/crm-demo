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
      meta:{requiresAuth:true},
      children:[
        {
          path:'crmInfoShow',
          name:'crmInfoShow_index',
          meta:{requiresAuth:true},
          component:resolve => {require(['../components/crmInfo/mainCrmInfoContent.vue'],resolve)}
        },
        {
          path:'saleThreadShow',
          name:'saleThreadShow_index',
          meta:{requiresAuth:true},
          component:resolve => {require(['../components/saleThread/mainSaleThreadContent.vue'],resolve)}
        },
        {
          path:'threadPoolShow',
          name:'threadPoolShow_index',
          meta:{requiresAuth:true},
          component:resolve => {require(['../components/threadPool/mainThreadPoolContent.vue'],resolve)}
        },
        {
          path:'clientShow',
          name:'clientShow_index',
          meta:{requiresAuth:true},
          component:resolve => {require(['../components/clientServer/mainClientContent.vue'],resolve)}
        },
        {
          path:'linkmanShow',
          name:'linkmanShow_index',
          meta:{requiresAuth:true},
          component:resolve => {require(['../components/linkman/mainLinkmanContent.vue'],resolve)}
        },
        {
          path:'dataPaneShow',
          name:'dataPane_index',
          meta:{requiresAuth:true},
          component:resolve => {require(['../components/dataPane/mainDataPane.vue'],resolve)},
          children:[
            {
              path:'salesThreadAnalyze',
              name:'salesThreadAnalyze_index',
              meta:{requiresAuth:true},
              component:resolve => {require(['../components/dataPane/salesThreadAnalyze.vue'],resolve)}
            },  
            {
              path:'clientAnalyze',
              name:'clientAnalyze_index',
              meta:{requiresAuth:true},
              component:resolve => {require(['../components/dataPane/clientAnalyze.vue'],resolve)}
            }
          ]
        }
      ]
    },
    {
      path: '/createNewClient',
      meta:{requiresAuth:true},
      component: resolve => {require(['../components/clientServer/createNewClient.vue'],resolve)},
      name: 'createNewClient'
    },
    {
      path: '/createNewLinkman',
      meta:{requiresAuth:true},
      component: resolve => {require(['../components/linkman/createNewLinkman.vue'],resolve)},
      name: 'createNewLinkman'
    },
    {
      path: '/mapExpand',
      meta:{requiresAuth:true},
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
