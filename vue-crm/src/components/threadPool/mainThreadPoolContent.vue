<template>
    <div class="clientContent" :style="{width:layoutWidth+'px'}">
       <Row>
        <Col span="24">
            <div class="crm-tit">
                <h2 class="dt-tit">
                线索池
                </h2>
                <Input
                    placeholder="搜索姓名"
                    icon="ios-search-strong"
                    class="fl dt-sc-box">
                </Input>
                <div class="fr dt-right">
                    <a href="/dist/createNewClient" class="ivu-btn ivu-btn-primary">
                      新建
                    </a>
                    <Dropdown placement="bottom-end"  @on-click="handelMore">
                        <Button>
                            更多
                            <Icon type="arrow-down-b"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem>修改线索池配置</DropdownItem>
                            <DropdownItem>导入</DropdownItem>
                            <DropdownItem name="export">导出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>  
                </div>
            </div>
        </Col>
       </Row>
       <Row>
        <Col span="24">
            <ul class="batch-trem clearfix" v-show="checkFlag">
                <li>
                    <span class="item-tit fl">场景：</span>
                    <Select v-model="sceneValue" style="width:150px">
                        <Option
                            v-for="item in scene" 
                        :value="item.value" 
                        :key="item.value">
                        {{ item.label }}
                        </Option>
                    </Select>
                </li>
                 <li>
                    <span class="item-tit fl">线索池：</span>
                    <Select v-model="threadPoolTypeValue" style="width:150px">
                        <Option
                            v-for="item in threadPoolType" 
                        :value="item.value" 
                        :key="item.value">
                        {{ item.label }}
                        </Option>
                    </Select>
                </li>
                <li class="noborder" style="margin-left:10px">
                    <Button type="dashed">高级筛选</Button>
                </li>
            </ul>
            <ul class="batch-trem clearfix" v-show="!checkFlag">
                <li>
                    <span class="item-tit item-sepcial fl">已选择<i class="checkLen">{{selectLen}}</i>条</span>
                </li>
                <li class="noborder" style="margin-left:10px">
                    <Button @click="sendEmail">发邮件</Button>
                    <Button @click="transfer">转移</Button>
                    <Button @click="changePrincipal">更换负责人</Button>
                    <Button @click="abolishFlag">作废</Button>
                    <Button @click="addGroupMemberFlag">添加相关团队成员</Button>
                    <Button @click="removeGroupMemberFlag">移除相关团队成员</Button>
                    <Button @click="lockFlag">锁定</Button>
                    <Button @click="unlockFlag">解锁</Button>
                </li>
            </ul>
        </Col>
       </Row>
       <Row>
        <table-column :selectFlag="tableColumnSelectFlag" :tableColumns="tableColumns" @tableHeadChange="tableHeadChange"></table-column>
        <Col class="clearfix" span="24">
            <Col span="24">
                <div ref="mainList" id="mainList" :style="{height:mainListHeight +'px'}">
                    <div class="selectColumn" title="设置列" @click="tableColumnSelectFlag=!tableColumnSelectFlag">
                        <Icon type="ios-gear" size="20" style="margin-top:10px;"></Icon>
                    </div> 
                    <Table :border="true" 
                            :stripe="true" 
                            :show-header="true" 
                            size="default" 
                            :height="mainListHeight"
                            :data="threadPoolList" 
                            :columns="listHead"
                            :loading="tableLoadingFlag"
                            @on-selection-change="selectChange"
                            ref="tableClient"
                            @on-row-click="showInfo">
                    </Table>
                </div>                   
            </Col>
            <Col span="24">
                <div class="main-block">
                    <Page :total="threadPoolTotalList.length" size="small" show-elevator show-sizer placement="top" @on-change="pageTurn" @on-page-size-change="pageSizeChange"></Page>
                </div>
            </Col>      
        </Col> 
       </Row>
        <Row class="clientInfoMain" :style="{right:r+'px'}">
            <thread-pool-user-info @rightChange="rightChange" :selectItem="selectItem"></thread-pool-user-info>
        </Row>
   </div>  
</template>

<script>
import tableColumn from '@/components/tableColumn'
import ThreadPoolUserInfo from '@/components/threadPool/threadPoolUserInfo'
import {deepClone} from '../../deepClone.js'
export default {
  components:{
      tableColumn,
      ThreadPoolUserInfo
  },
  data () {
      return {
        tableColumns:{  // 所有表头项
            clientName:{
              columnName:'姓名',
              selectFlag:true
            },
            clientCompany:{
              columnName:'公司',
              selectFlag:true
            },
            dutyOfficer:{
              columnName:'负责人',
              selectFlag:true
            },
            dutyOfficerSection:{
               columnName:'负责人所在部门',
               selectFlag:true
            },
            clientStatus:{
               columnName:'状态',
               selectFlag:true
            },
            saleThreadDetail:{
               columnName:'销售线索详情',
               selectFlag:true
            },
            threadPool:{
               columnName:'线索池',
               selectFlag:true
            },
            createUser:{
               columnName:'创建人',
               selectFlag:true
            },
             createTime:{
               columnName:'创建时间',
               selectFlag:true
            },
            clinetFrom:{
               columnName:'来源',
               selectFlag:true
            },
            branch:{
               columnName:'部门',
               selectFlag:false
            },
            phoneNum:{
               columnName:'电话',
               selectFlag:true
            },
            mobilePhoneNum:{
               columnName:'手机',
               selectFlag:false
            },
            address:{
               columnName:'地址',
               selectFlag:true
            },
            url:{
               columnName:'网址',
               selectFlag:true
            },
              email:{
               columnName:'邮件',
               selectFlag:true
            },
            lockStatus:{
               columnName:'锁定状态',
               selectFlag:true
            },
        },
        showCheckbox: true,  // table中是否有CheckBox列
        tableLoadingFlag:false, // 表格加载中、
        tableColumnSelectFlag:false,  // 设置列是否显示 true：显示
        selectLen:0,      // 选中个数
        pageNum:1, // 初始当前页码
        pageSize:10,  // 初始每页条数
        r:-900, // 详情页面定位
        selectItem:{}, // 当前点击table行
        threadPoolType: [  // 线索池选项
            {
                value: '0',
                label: '销售线索池'
            }
        ],
        threadPoolTypeValue: '0', // 线索池选中项
        scene: [ // 场景选项
          {
            value: '0',
            label: '全部销售线索'
          },
          {
            value: '1',
            label: '未分配的销售线索'
          },
          {
            value: '2',
            label: '已分配的销售线索'
          },
          {
            value: '3',
            label: '超时的销售线索'
          }
        ],
        sceneValue: '0',  // 场景选中项
        selectedClientList:[] // 选中的数据
      }
  },
  watch:{
    // 监控列表信息变化，主要是解决从后台取数据需要一定的时间，一开始渲染画面的列表为空
    threadPoolTotalList:{
      deep:true,
      handler(){
         if(this.threadPoolTotalList.length){
           this.threadPoolList = this.threadPoolTotalList.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
         }
      }
    }
  },
  mounted () {
    this.$store.commit('setCheckFlag',true)
    this.$store.dispatch('getThreadPoolList')
  },
  computed:{
    layoutWidth:{ // 容器宽度
      get(){
         return this.$store.state.layoutWidth
      },
      set(value){

      }
    },
    layoutHeight:{ // 容器高度
      get(){
        return this.$store.state.layoutHeight
      },
      set(){

      }
    },
    checkFlag:{ // 选中flag
      get(){
        return this.$store.state.checkFlag
      },
      set(value){
         this.$store.commit('setCheckFlag',value)
      }
    },
    mainListHeight:{ // table高度
      get(){
        return this.layoutHeight - 170
      },
      set(value){
      }
    },
    listHead:{ //设置表头
      get(){
        return this.setTableHead()
      },
      set(value){
      }
    },
    threadPoolTotalList:{ // 所有客户列表信息
      get(){
        return this.$store.state.threadPoolList
      },
      set(){
      }
    },
    threadPoolList:{  // 本页显示信息
      get(){
         if(this.threadPoolTotalList.length){
           return this.threadPoolTotalList.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
         }else{
           return []
         }
      },
      set(value){

      }
    }
  },
  methods:{
    // 设置表头
    setTableHead (){
      let columns = []
      if (this.showCheckbox) { // checkBox列
        columns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
      if (this.showIndex) { // index列
        columns.push({
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        })
      }
      if(this.tableColumns.clientName.selectFlag){ // 客户姓名         
        columns.push({
          width: 150,
          title: '姓名',
          key: 'clientName',
          sortable: true
        }) 
      }
       if(this.tableColumns.clientCompany.selectFlag){ // 公司     
        columns.push({ // 客户名称
          width: 120,
          title: '公司',
          key: 'clientCompany',
          sortable: true,
          ellipsis: true
        })
       }
      if(this.tableColumns.dutyOfficer.selectFlag){ // 负责人
        columns.push({
          width: 120,
          title: '负责人',
          key: 'dutyOfficer',
          sortable: true,
          ellipsis: true
        })  
      }
      if(this.tableColumns.dutyOfficerSection.selectFlag){ // 负责人所在部门
        columns.push({
          width: 150,
          title: '负责人所在部门',
          key: 'dutyOfficerSection',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.clientStatus.selectFlag){ // 状态     
        columns.push({
          width: 120,
          title: '状态',
          key: 'clientStatus',
          sortable: true
        })
      }
      if(this.tableColumns.saleThreadDetail.selectFlag){ // 销售线索详情     
        columns.push({
          width: 120,
          title: '销售线索详情',
          key: 'saleThreadDetail',
          sortable: true
        })
      }
      if(this.tableColumns.threadPool.selectFlag){ // 线索池    
        columns.push({
          width: 120,
          title: '线索池',
          key: 'threadPool',
          sortable: true
        })
      }
      if(this.tableColumns.createUser.selectFlag){ // 创建人   
        columns.push({
          width: 120,
          title: '创建人',
          key: 'createUser',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.createTime.selectFlag){ // 创建时间
        columns.push({
          width: 120,
          title: '创建时间',
          key: 'createTime',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.clinetFrom.selectFlag){ // 来源
        columns.push({
          width: 120,
          title: '来源',
          key: 'clinetFrom',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.branch.selectFlag){ // 部门  
        columns.push({
          width: 120,
          title: '部门',
          key: 'branch',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.phoneNum.selectFlag){ // 电话
        columns.push({
          width: 120,
          title: '电话',
          key: 'phoneNum',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.mobilePhoneNum.selectFlag){ // 手机   
        columns.push({
          width: 120,
          title: '手机',
          key: 'mobilePhoneNum',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.address.selectFlag){ // 地址   
        columns.push({
          width: 120,
          title: '地址',
          key: 'address',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.url.selectFlag){ // 网址
        columns.push({
          width: 120,
          title: '网址',
          key: 'url',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.email.selectFlag){ // 邮件
        columns.push({
          width: 120,
          title: '邮件',
          key: 'email',
          sortable: true,
          ellipsis: true
        })
      } 
      if(this.tableColumns.lockStatus.selectFlag){ // 锁定状态
        columns.push({
          width: 120,
          title: '锁定状态',
          key: 'lockStatus',
          sortable: true
        })
      }
      columns.push({
        width: 50,
        key: 'action',
        align: 'center',
        fixed: 'right',
        title:' ',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              }
            }, '查看')
          ])
        }
      })
        return columns
    },
    // 表头列变化
    tableHeadChange (changeColumn, flag){
       this.tableColumns = deepClone(changeColumn)
       this.setTableHead()
       this.tableColumnSelectFlag = flag
    },
    // 是否有选中的数据
    selectChange (selection) {
      this.$store.commit('setSelectedDataList',selection)
      if(selection.length){
        this.$store.commit('setCheckFlag',false)
        this.selectLen = selection.length
      }else{
          this.$store.commit('setCheckFlag',true)
      }
    },
    // 翻页
    pageTurn (num) {
      this.pageNum = num
      this.$store.commit('setCheckFlag',true)
      this.$store.commit('setSelectedDataList',[])
    },
    // 每页显示页数变化
    pageSizeChange (size) {
       this.pageSize = size
       this.$store.commit('setCheckFlag',true)
       this.$store.commit('setSelectedDataList',[])
    },
    // 发邮件
    sendEmail () {
      this.$store.commit('setSendEmailFlag',true)
    },
    // 转移
    transfer () {
       this.$store.commit('setTransferFlag',true)
    },
    // 更换负责人
    changePrincipal () {
       this.$store.commit('setChangePrincipalFlag',true)
    },
    // 废止
    abolishFlag (){
      this.$store.commit('setAbolishFlag',true)
    },
    // 添加相关团队成员
    addGroupMemberFlag(){
      this.$store.commit('setAddGroupMemberFlag',true)
    },
    // 删除相关团队成员
    removeGroupMemberFlag(){
      this.$store.commit('setRemoveGroupMemberFlag',true)
    },
    // 锁定
    lockFlag (){
       this.$store.commit('setLockFlag',true)
    },
    // 解锁
    unlockFlag (){
      this.$store.commit('setUnlockFlag',true)
    },
    // 详细信息位置
    rightChange (r){
       this.r = r
    },
    // 详细信息显示
    showInfo(item,index){
      this.r = 0
      this.selectItem = item
    },
    // 单击更多
    handelMore(name){
     if (name === 'export') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>  
 .clientContent{
     height: 100%;
     overflow: hidden;
     position: relative;
 }
 .crm-tit{
    height: 60px;
    background-color: #f4f6f9;
    border-color: #d8dde8;
    position: riative;
    z-index: 2;
  }
  .dt-tit{
    float: left;
    padding: 0 20px;
    font-size: 18px;
    line-height: 60px;
  }
  .dt-sc-box{
    width: 260px;
    margin: 13px 0 0 300px;
  }
  .dt-right{
      margin:13px 50px 0 0;
      font-size: 14px;
  }
  #mainList{
    overflow: auto;
    position: relative;
  }
  #mainList .selectColumn{
    width: 50px;
    height: 40px;
    position: absolute;
    right: 0px;
    top:1px;
    z-index: 3;
    padding-left: 10px;
  }
  .main-block{
    background: #f4f6f9;
    padding: 15px;
  } 
  .clientListMap{
    overflow: auto;
    width: 300px;
  }
  #ListMap{
    height: 100%;
    float: left;
  }
  .clientInfoMain{
    width: 900px;
    height: 100%;
    position:absolute;
    top:0px;
    right:0px;
    background: #fff;
    z-index:9999;
    transition: .3s linear;
  }
  .batch-trem{
    padding: 9px 0 10px;
    border-top: 1px solid #d8dde8;
    background-color: #f4f6f9;
    line-height: 36px;
  }
  .batch-trem>li{
      float: left;
      padding-right: 20px;
      border-right: 1px solid #d8dde8;
  }
  .batch-trem .noborder{
      border:0;
  }
  .batch-trem .item-sepcial{
    font-size: 12px;
  }
  .batch-trem .checkLen{
    color: #2d8cf0;
    display: inline-block;
    padding: 0 5px;
  }

  .batch-trem .item-tit{
    padding-right: 20px;
    padding-left: 20px;
    color: #999;
    font-size: 14px
  }
</style>
