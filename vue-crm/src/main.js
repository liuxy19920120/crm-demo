import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import iView from 'iview'
import Cookies from 'js-cookie'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
import '@/assets/css/reset.css'
import '@/assets/css/common.css'
Vue.use(iView)
Vue.use(VueResource)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(Cookies.get('user') && Cookies.get('password')){
       next() 
    }else{
       console.log(1)
       next({path:'/'}) 
    }

  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: {
    App
  }
})
