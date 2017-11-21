import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    address: 'http://localhost:8888', // 后台接口访问地址
    crmInfoList:[], // crm客户信息列表
    saleThreadList:[], // 销售线索客户列表
    threadPoolList:[], // 线索池客户列表
    clientList: [], // 客户列表
    linkmanList:[], // 联系人列表
    layoutHeight:'', // 内容高度
    layoutWidth:'', // 内容宽度
    sendEmailFlag:false, // 发邮件flag false:邮件弹框不显示（默认） true: 邮件弹框显示
    transferFlag:false, // 转移flag false:转移弹框不显示（默认） true: 转移弹框显示
    changePrincipalFlag:false, // 跟换负责人flag false:跟换负责人弹框不显示（默认） true: 跟换负责人弹框显示
    abolishFlag:false, // 作废flag false:作废弹框不显示（默认） true: 作废弹框显示
    addGroupMemberFlag:false, // 添加成员flag false:添加成员弹框不显示（默认） true: 添加成员弹框显示
    removeGroupMemberFlag:false, // 删除成员flag false:删除成员弹框不显示（默认） true: 删除成员弹框显示
    lockFlag:false,  // 锁定flag false:锁定弹框不显示（默认） true: 锁定弹框显示
    unlockFlag:false, // 解锁flag false:解锁弹框不显示（默认） true: 解锁弹框显示
    checkFlag:true, // 是否有选中的数据 false:有选中的数据 true: 没选中的数据
    selectedDataList:[] // 选中的数据列表
  },
  mutations: {
    // 设置高度随浏览器变化自适应
    setLayoutHeight (state){
      this.state.layoutHeight =  document.documentElement.clientHeight - 60
    },
    // 设置宽度
    setLayoutWidth(state, payLoad){
      this.state.layoutWidth = document.documentElement.clientWidth - payLoad
    },
    // 设置发邮件
    setSendEmailFlag(state, payLoad){
      this.state.sendEmailFlag = payLoad
    },
    // 设置转移
    setTransferFlag(state, payLoad){
      this.state.transferFlag = payLoad
    },
    // 设置负责人
    setChangePrincipalFlag(state, payLoad){
      this.state.changePrincipalFlag = payLoad
    },
    // 设置废止
    setAbolishFlag(state, payLoad){
      this.state.abolishFlag = payLoad
    },
    // 设置添加成员
    setAddGroupMemberFlag(state, payLoad){
      this.state.addGroupMemberFlag = payLoad
    },
    // 设置删除成员
    setRemoveGroupMemberFlag(state, payLoad){
      this.state.removeGroupMemberFlag = payLoad
    },
    // 设置锁定
    setLockFlag(state, payLoad){
      this.state.lockFlag = payLoad
    },
    // 设置解锁
    setUnlockFlag(state, payLoad){
      this.state.unlockFlag = payLoad
    },
    // 设置选中
     setCheckFlag(state, payLoad){
      this.state.checkFlag = payLoad
    },
    // 设置选中数据
    setSelectedDataList(state,payLoad){
      this.state.selectedDataList = payLoad
    },
    // 设置crm客户信息列表
    setCrmInfoList (state, payLoad) {
      let list = payLoad.data.crmInfoList
      let newList = []
      if(list.length){
        newList = Array.from(list).map(function(item){
          item.clientStatus = item.clientStatus === '0' ? '已分配':'未分配'
          item.lockStatus = item.lockStatus === '0' ? '未锁定':'已锁定'
          return item
        })
      }
      this.state.crmInfoList = newList
    },
    // 设置销售线索客户列表
    setSaleThreadList (state, payLoad) {
      let list = payLoad.data.saleThreadList
      let newList = []
      if(list.length){
        newList = Array.from(list).map(function(item){
          item.clientStatus = item.clientStatus === '0' ? '已分配':'未分配'
          item.lockStatus = item.lockStatus === '0' ? '未锁定':'已锁定'
          return item
        })
      }
      this.state.saleThreadList = newList
    },
    // 设置线索池客户列表
    setThreadPoolList (state, payLoad) {
      let list = payLoad.data.threadPoolList
      let newList = []
      if(list.length){
        newList = Array.from(list).map(function(item){
          item.clientStatus = item.clientStatus === '0' ? '已分配':'未分配'
          item.lockStatus = item.lockStatus === '0' ? '未锁定':'已锁定'
          return item
        })
      }
      this.state.threadPoolList = newList
    },
    // 设置客户列表
    setClientList (state, payLoad) {
      let list = payLoad.data.clientList
      let newList = []
      if(list.length){
        newList = Array.from(list).map(function(item){
          item.clientStatus = item.clientStatus === '0' ? '已分配':'未分配'
          item.lockStatus = item.lockStatus === '0' ? '未锁定':'已锁定'
          return item
        })
      }
      this.state.clientList = newList
    },
    //设置联系人列表
    setLinkmanList (state, payLoad) {
      let list = payLoad.data.linkmanList
      let newList = []
      if(list.length){
         newList = Array.from(list).map(function(item){
            item.status = item.status === '0' ? '已分配':'未分配'
            item.lockStatus = item.lockStatus === '0' ? '未锁定':'已锁定'
            return item
        })
      }
      this.state.linkmanList = newList
    }
  },
  actions: {
    // 和后台数据接口交互取得销售线索客户列表信息
    getCrmInfoList (context) {
      Axios.post(this.state.address + '/getCrmInfoList')
      .then((data) => {
        context.commit('setCrmInfoList', data)
      })
    },
    // 和后台数据接口交互取得销售线索客户列表信息
    getSaleThreadList (context) {
      Axios.post(this.state.address + '/getSaleThreadList')
      .then((data) => {
        context.commit('setSaleThreadList', data)
      })
    },
     // 和后台数据接口交互取得线索池客户列表信息
    getThreadPoolList (context) {
      Axios.post(this.state.address + '/getThreadPoolList')
      .then((data) => {
        context.commit('setThreadPoolList', data)
      })
    },
    // 和后台数据接口交互取得客户列表信息
    getClientList (context) {
      Axios.post(this.state.address + '/getClientList')
      .then((data) => {
        context.commit('setClientList', data)
      })
    },
    // 添加新的客户
    createNewClient (context, formData) {
      Axios.post(this.state.address + '/createNewClient', formData.formValidate)
      .then((data) => {
        formData.newRouter.push({name:'clientShow_index'})
      })
    },
    // 和后台数据接口交互取得联系人列表信息
    getLinkmanList(context){
       Axios.post(this.state.address + '/getLinkmanList')
        .then((data) => {
          context.commit('setLinkmanList', data)
        })
    }
  }
})

export default store
