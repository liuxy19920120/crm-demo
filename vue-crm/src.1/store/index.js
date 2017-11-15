import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    address: 'http://192.168.2.70:8888',
    clientList: []
  },
  mutations: {
    setClientList (state, payLoad) {
      this.state.clientList = payLoad.data.clientList
    }
  },
  actions: {
    getClientList (context) {
      Axios.post(this.state.address + '/getClientList')
      .then((data) => {
        context.commit('setClientList', data)
      })
    }
  }
})

export default store
