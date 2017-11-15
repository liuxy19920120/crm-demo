<template>
  <div>
    <header-nav ref="header"></header-nav>
    <div ref="content" style="overflow:hidden">
      <main-sidebar ref="mainSidebar" class="fl"></main-sidebar>
      <router-view></router-view>
      <!-- <div ref="mainClientContent" class="fl">
        <main-client-content 
          :layoutHeight="layoutHeight" 
          @lockFlag="showLockFlag=true" 
          @unlockFlag="showUnlockFlag=true" 
          @getSelectedClientList="getSelectedClientList" 
          :clientTotalList="clientList" 
          :checkFlagFromMain="checkFlag"
          @checkFlagChange="checkFlagChange"
          @addGroupMemberFlag="addGroupMemberFlag"></main-client-content> 
      </div> -->
    </div>
     <pop-up
         :showFlag="showLockFlag"
         @showFlagChange="showFlagChange" 
         type="lock">
      <h1 slot="header">锁定</h1>
      <p slot="content">确定要锁定吗？锁定后不可再编辑或作废操作。</p>
    </pop-up>
    <pop-up 
        :showFlag="showUnlockFlag"
        @showFlagChange="showFlagChange" 
        type="unlock">
      <h1 slot="header">解锁</h1>
      <p slot="content">确定要解锁吗？解锁后其他相关用户也可以进行编辑或作废等操作。</p>
    </pop-up>
     <pop-up
         :showFlag="showAddGroupMemberFlag"
         @showFlagChange="showFlagChange" 
         type="addGroupMember"
         okText="添加">
      <h1 slot="header">添加团队成员</h1>
      <div slot="content" class="addGroupMember">
        <member-input style="z-index:10"  :showFlag="showAddGroupMemberFlag"></member-input>
        <p class="clearfix">
          <label class="txt">权限</label>
          <RadioGroup v-model="groupMemberItem.permission">
            <Radio label="01">只读</Radio>
            <Radio label="02">只写</Radio>
          </RadioGroup>
        </p>
        <p class="clearfix">
         <label class="txt">团队角色</label>
         <CheckboxGroup v-model="groupMemberItem.groupRoles">
            <Checkbox label="01">普通成员</Checkbox>
            <Checkbox label="02">售后人员</Checkbox>
            <Checkbox label="03">联合跟进人</Checkbox>
         </CheckboxGroup>
        </p>
        <p class="conf-item">
         <label class="txt">添加到其他联系团队</label>
         <CheckboxGroup v-model="groupMemberItem.linkman">
            <Checkbox label="01">联系人</Checkbox>
         </CheckboxGroup>
        </p>
      </div>
    </pop-up>
  </div>
</template>

<script>
import HeaderNav from '@/components/header'
import MainSidebar from '@/components/mainSidebar'
import PopUp from '@/components/dialog'
import MemberInput from '@/components/addMemberInput'
import Axios from 'axios'
export default {
  components: {
    HeaderNav, 
    MainSidebar,
    PopUp,
    MemberInput,
    Axios
  },
  data () {
    return {
      groupMemberItem: {
          permission: '01',
          groupRoles: ['01','02'],
          linkman: ['01']
      }
    }
  },
  mounted () {
    // 初始化默认高度
    this.init()
    // 浏览器变化
    window.onresize = this.init
    // 获取表单数据
    this.$store.dispatch('getClientList')
  },
  computed:{
    showLockFlag:{
      get(){
        return this.$store.state.lockFlag
      },
      set(value){
          this.$store.commit('setLockFlag',value)
      }
    },
    showUnlockFlag:{
      get(){
        return this.$store.state.unlockFlag
      },
      set(value){
          this.$store.commit('setUnlockFlag',value)
      }
    },
    showAddGroupMemberFlag:{
      get(){
        return this.$store.state.addGroupMemberFlag
      },
      set(value){
          this.$store.commit('setAddGroupMemberFlag',value)
      }
    },
    clientList:{
      get(){
        return this.$store.state.clientList
      },
      set(value){
      }
    }
  },
  methods: {
    init () {
      // 设置默认高度，使内容占满整个屏幕
      this.$store.commit('setLayoutHeight')
      this.$refs.content.style.height = this.$store.state.layoutHeight + 'px'
    },
    showFlagChange (data) {
      // 锁定
      if(data.value === 'lock'){
         this.$store.commit('setLockFlag',data.flag)
        if(data.sign === 'ok'){
          let list = this.$store.state.selectedDataList
          let that = this
          if(list.length){
            Axios.post(this.$store.state.address + '/lockStatus',list)
            .then((data) => {
              if(data.data.code === 0){
                  list.forEach(function(item) {
                  let id = item.clientId
                  for(var i=0;i<this.clientList.length;i++){
                    if(this.clientList[i].clientId == id){
                      this.clientList[i].lockStatus = '已锁定'
                      break
                    }
                  }           
                },that)
                this.$Message.success({
                  content:'锁定成功',
                  duration:5
                })
              }else{
                this.$Message.error({
                  content: '锁定错误',
                  duration: 5
                })
              }
               this.$store.commit('setCheckFlag',true)
               this.$store.commit('setSelectedDataList',[])
            })
          }
        }
        // 未锁定  
      }else if(data.value === 'unlock'){
        this.showUnlockFlag = data.flag
        if(data.sign === 'ok'){
          let list = this.$store.state.selectedDataList
          let that = this
          if(list.length){
            Axios.post(this.$store.state.address + '/unlockStatus',list)
            .then((data) => {
              if(data.data.code === 0){
                  list.forEach(function(item) {
                  let id = item.clientId
                  for(var i=0;i<this.clientList.length;i++){
                    if(this.clientList[i].clientId == id){
                      this.clientList[i].lockStatus = '未锁定'
                      break
                    }
                  }           
                },that)
                this.$Message.success({
                  content:'修改锁定成功',
                  duration:5
                })
              }else{
                    this.$Message.error({
                        content: '修改锁定失败',
                        duration: 5
                    })
              }
               this.$store.commit('setCheckFlag',true)
               this.$store.commit('setSelectedDataList',[])
          })
          }
        }
      }else if(data.value === 'addGroupMember'){
        this.$store.commit('setAddGroupMemberFlag',data.flag)
        if(data.sign === 'ok'){

        }
      }
    }
  }
}
</script>

<style>
.addGroupMember p{
  padding: 10px 0;
}
.addGroupMember .conf-item{
    border-top: 1px dashed #EEE;
    padding: 20px 0;
    margin-top: 10px;
}
.addGroupMember p .txt{
  width: 146px;
}
.addGroupMember p>*{
  float: left;
}
</style>
