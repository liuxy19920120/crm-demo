<template>
  <div>
    <!-- header -->
    <header-nav ref="header"></header-nav>
    <!-- content -->
    <div ref="content" style="overflow:hidden">
      <!-- 侧边栏 -->
      <main-sidebar ref="mainSidebar" class="fl"></main-sidebar>
      <!-- 详细显示内容 -->
      <router-view></router-view>
    </div>
    <!-- 发邮件 -->
    <pop-up 
        :showFlag="showSendEmailFlag"
        @showFlagChange="showFlagChange" 
        type="sendEmail">
      <h1 slot="header">提示</h1>
      <p slot="content">当前客户没有绑定邮箱，是否进行绑定。</p>
    </pop-up>
    <!-- 转移 -->
    <pop-up 
        :showFlag="showTransferFlag"
        @showFlagChange="showFlagChange" 
        type="transfer">
      <h1 slot="header">转移</h1>
      <p slot="content">确定要转移当前客户吗？</p>
    </pop-up>
    <!-- 更换负责人弹框 -->
     <pop-up
         :showFlag="showChangePrincipalFlag"
         @showFlagChange="showFlagChange" 
         type="changePrincipal"
         okText="更换">
      <h1 slot="header">更换负责人</h1>
      <div slot="content" class="groupMember">
        <member-input style="z-index:10"  :showFlag="showChangePrincipalFlag"></member-input>        
        <p class="clearfix">
          <label class="txt">将原负责人</label>
          <RadioGroup v-model="changePrincipal.principal">
            <Radio label="01">移除相关团队</Radio>
            <Radio label="02">转为普通成员</Radio>
          </RadioGroup>
        </p>
        <p class="clearfix">
         <label class="txt">变更其他相关对象下的负责人</label>
         <CheckboxGroup v-model="changePrincipal.changeOthers">
            <Checkbox label="01">联系人</Checkbox>
            <Checkbox label="02">合同</Checkbox>
         </CheckboxGroup>
        </p>
      </div>
    </pop-up>
    <!-- 废止弹框 -->
     <pop-up 
        :showFlag="showAbolishFlag"
        @showFlagChange="showFlagChange" 
        type="abolish">
      <h1 slot="header">作废</h1>
      <p slot="content">作废后将进入回收站，确定将这些用户作废吗？</p>
    </pop-up>
    <!-- 添加成员弹框 -->
     <pop-up
         :showFlag="showAddGroupMemberFlag"
         @showFlagChange="showFlagChange" 
         type="addGroupMember"
         okText="添加">
      <h1 slot="header">添加团队成员</h1>
      <div slot="content" class="groupMember">
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
    <!-- 删除成员弹框 -->
    <pop-up 
        :showFlag="showRemoveGroupMemberFlag"
        @showFlagChange="showFlagChange" 
        type="removeGroupMember"
        okText="移除">
      <h1 slot="header">移除团队成员</h1>
      <div slot="content" class="groupMember">
        <p>当前操作不可移除数据负责人</p>
        <member-input style="z-index:10"  :showFlag="showRemoveGroupMemberFlag"></member-input>
      </div>
    </pop-up>
    <!-- 锁定弹框 -->
     <pop-up
         :showFlag="showLockFlag"
         @showFlagChange="showFlagChange" 
         type="lock">
      <h1 slot="header">锁定</h1>
      <p slot="content">确定要锁定吗？锁定后不可再编辑或作废操作。</p>
    </pop-up>
    <!-- 解锁弹框 -->
    <pop-up 
        :showFlag="showUnlockFlag"
        @showFlagChange="showFlagChange" 
        type="unlock">
      <h1 slot="header">解锁</h1>
      <p slot="content">确定要解锁吗？解锁后其他相关用户也可以进行编辑或作废等操作。</p>
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
      // 添加成员弹框中的默认选中项
      groupMemberItem: {
          permission: '01', // 权限
          groupRoles: ['01','02'], // 团队角色
          linkman: ['01'] // 联系人
      },
       // 变更负责人弹框中的默认选中项
      changePrincipal: {
          principal: '01', // 将院负责人
          changeOthers: ['01'], // 变更其他相关团队
      }

    }
  },
  mounted () {
    // 初始化默认高度
    this.init()
    // 浏览器变化
    window.onresize = this.init
    // 获取客户列表
    this.$store.dispatch('getClientList')
  },
  computed:{
     // 发邮件
    showSendEmailFlag:{
      get(){
         return this.$store.state.sendEmailFlag
      },
      set(value){
        this.$store.commit('setSendEmailFlag',value)
      }
    },
     // 转移
    showTransferFlag:{
      get(){
         return this.$store.state.transferFlag
      },
      set(value){
        this.$store.commit('setTransferFlag',value)
      }
    },
     // 变更负责人
    showChangePrincipalFlag:{
      get(){
         return this.$store.state.changePrincipalFlag
      },
      set(value){
        this.$store.commit('setChangePrincipalFlag',value)
      }
    },
    // 废止
    showAbolishFlag:{
      get(){
         return this.$store.state.abolishFlag
      },
      set(value){
        this.$store.commit('setAbolishFlag',value)
      }
    },
    // 添加成员
    showAddGroupMemberFlag:{
      get(){
        return this.$store.state.addGroupMemberFlag
      },
      set(value){
          this.$store.commit('setAddGroupMemberFlag',value)
      }
    },
    // 删除成员
    showRemoveGroupMemberFlag:{
      get(){
        return this.$store.state.removeGroupMemberFlag
      },
      set(value){
          this.$store.commit('setRemoveGroupMemberFlag',value)
      }
    },
    // 锁定
    showLockFlag:{
      get(){
        return this.$store.state.lockFlag
      },
      set(value){
          this.$store.commit('setLockFlag',value)
      }
    },
    // 解锁
    showUnlockFlag:{
      get(){
        return this.$store.state.unlockFlag
      },
      set(value){
          this.$store.commit('setUnlockFlag',value)
      }
    },
    // 客户列表
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
       // 设置宽度
      this.$store.commit('setLayoutWidth',200)
    },
    showFlagChange (data) {
       // 发邮件
      if(data.value === 'sendEmail'){
        this.$store.commit('setSendEmailFlag',data.flag)
        if(data.sign === 'ok'){

        }
       // 转移
      }else if(data.value === 'transfer'){
        this.$store.commit('setTransferFlag',data.flag)
        if(data.sign === 'ok'){

        }
      // 更换负责人
      }else if(data.value === 'changePrincipal'){
        this.$store.commit('setChangePrincipalFlag',data.flag)
        if(data.sign === 'ok'){

        }
      // 废止弹框
      }else if(data.value === 'abolish'){
        this.$store.commit('setAbolishFlag',data.flag)
        if(data.sign === 'ok'){

        }
      // 添加成员
      }else if(data.value === 'addGroupMember'){
        this.$store.commit('setAddGroupMemberFlag',data.flag)
        if(data.sign === 'ok'){

        }
      // 删除成员弹框
      }else if(data.value === 'removeGroupMember'){
        this.$store.commit('setRemoveGroupMemberFlag',data.flag)
        if(data.sign === 'ok'){

        }
      // 锁定
      }else if(data.value === 'lock'){
         this.$store.commit('setLockFlag',data.flag)
         // 点击确定按钮
        if(data.sign === 'ok'){
          let list = this.$store.state.selectedDataList
          let that = this
          // 选中数据存在，修改数据中的锁定状态
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
        // 点击确定
        if(data.sign === 'ok'){
          let list = this.$store.state.selectedDataList
          let that = this
          // 选中数据存在
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
      }
    }
  }
}
</script>

<style>
.groupMember p{
  padding: 10px 0;
}
.groupMember .conf-item{
    border-top: 1px dashed #EEE;
    padding: 20px 0;
    margin-top: 10px;
}
.groupMember p .txt{
  width: 146px;
}
.groupMember p>*{
  float: left;
}
</style>
