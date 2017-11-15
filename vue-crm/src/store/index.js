import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    address: 'http://localhost:8888',
    clientList: [],
    linkmanList:[],
    layoutHeight:'',
    lockFlag:false,
    unlockFlag:false,
    checkFlag:true,
    addGroupMemberFlag:false,
    selectedDataList:[]
  },
  mutations: {
    setLayoutHeight (state){
      this.state.layoutHeight =  document.documentElement.clientHeight - 60
    },
    setLockFlag(state, payLoad){
      this.state.lockFlag = payLoad
    },
     setUnlockFlag(state, payLoad){
      this.state.unlockFlag = payLoad
    },
     setCheckFlag(state, payLoad){
      this.state.checkFlag = payLoad
    },
     setAddGroupMemberFlag(state, payLoad){
      this.state.addGroupMemberFlag = payLoad
    },
    setSelectedDataList(state,payLoad){
      this.state.selectedDataList = payLoad
    },
    setClientList (state, payLoad) {
      let list = payLoad.data.clientList
      let newList = Array.from(list).map(function(item){
          item.clientStatus = item.clientStatus === '0' ? '已分配':'未分配'
          item.lockStatus = item.lockStatus === '0' ? '未锁定':'已锁定'
          return item
      })
      this.state.clientList = newList
    },
    setLinkmanList (state, payLoad) {
      let list = payLoad.data.linkmanList
      let newList = Array.from(list).map(function(item){
          item.status = item.status === '0' ? '已分配':'未分配'
          item.lockStatus = item.lockStatus === '0' ? '未锁定':'已锁定'
          return item
      })
      this.state.linkmanList = newList
    }
  },
  actions: {
    getClientList (context) {
      Axios.post(this.state.address + '/getClientList')
      .then((data) => {
        context.commit('setClientList', data)
      })
    },
    createNewClient (context, formData) {
      Axios.post(this.state.address + '/createNewClient', formData.formValidate)
      .then((data) => {
        formData.newRouter.push('/clientUserMain')
      })
    },
    getLinkmanList(context){
       Axios.post(this.state.address + '/getLinkmanList')
        .then((data) => {
          context.commit('setLinkmanList', data)
        })
    }
  }
})

export default store
