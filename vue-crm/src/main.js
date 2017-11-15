import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
import '@/assets/css/reset.css'
import '@/assets/css/common.css'
Vue.use(iView)
Vue.use(VueResource)

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
