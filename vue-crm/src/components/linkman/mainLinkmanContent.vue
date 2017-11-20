<template>
    <div class="clientContent" :style="{width:w+'px'}">
       <Row>
        <Col span="24">
            <div class="crm-tit">
                <h2 class="dt-tit">
                联系人
                </h2>
                <Input
                    placeholder="搜索联系人"
                    icon="ios-search-strong"
                    class="fl dt-sc-box">
                </Input>
                <div class="fr dt-right">
                    <a href="/createNewLinkman" class="ivu-btn ivu-btn-primary">
                    新建
                    </a>
                    <Dropdown placement="bottom-end"  @on-click="tableControl">
                        <Button>
                            更多
                            <Icon type="arrow-down-b"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem>智能表单</DropdownItem>
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
                <li class="noborder" style="margin-left:10px">
                    <Button type="dashed">高级筛选</Button>
                </li>
            </ul>
            <ul class="batch-trem clearfix" v-show="!checkFlag">
                <li>
                    <span class="item-tit item-sepcial fl">已选择<i class="checkLen">{{selectLen}}</i>条</span>
                </li>
                <li class="noborder" style="margin-left:10px">
                    <Button>发邮件</Button>
                    <Button>转移</Button>
                    <Button>更换负责人</Button>
                    <Button>作废</Button>
                    <Button @click="addGroupMemberFlag">添加相关团队成员</Button>
                    <Button>移除相关团队成员</Button>
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
                            :data="linkmanList" 
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
                    <Page :total="linkmanTotalList.length" size="small" show-elevator show-sizer placement="top" @on-change="pageTurn" @on-page-size-change="pageSizeChange"></Page>
                </div>
            </Col>      
        </Col>  
       </Row>
        <Row class="clientInfoMain" :style="{right:r+'px'}">
            <client-user-info @rightChange="rightChange" :selectItem="selectItem"></client-user-info>
        </Row>
   </div>  
</template>

<script>
import tableColumn from '@/components/tableColumn'
import ClientUserInfo from '@/components/linkman/linkmanInfo'
import {deepClone} from '../../deepClone.js'
export default {
  components:{
      tableColumn,
      ClientUserInfo
  },
  data () {
      return {
        tableColumns:{  // 所有表头项
            linmanName:{
              columnName:'客户名称',
              selectFlag:true
            },
            linkmanCompanyName:{
               columnName:'公司名称',
               selectFlag:true
            },
            linkmanBranch:{
               columnName:'部门',
               selectFlag:true
            },
            linkmanDuty:{
               columnName:'职务',
               selectFlag:true
            },
            linkmanMobilePhoneNum:{
               columnName:'手机',
               selectFlag:true
            },
            linkmanPhoneNum:{
               columnName:'电话',
               selectFlag:true
            },
            linkmanEmail:{
               columnName:'邮件',
               selectFlag:true
            },
            policyMaker:{
               columnName:'关键决策人',
               selectFlag:true
            },
            linkmanSex:{
               columnName:'性别',
               selectFlag:true
            },
            principal:{
               columnName:'负责人',
               selectFlag:true
            },
            principalBranch:{
               columnName:'负责人所在部门',
               selectFlag:true
            },
            linkmanBirth:{
               columnName:'生日',
               selectFlag:false
            },
            linkmanAddress:{
               columnName:'地址',
               selectFlag:false
            },
            commit:{
               columnName:'备注',
               selectFlag:false
            },
            createUser:{
               columnName:'创建人',
               selectFlag:false
            },
            createTime:{
               columnName:'创建时间',
               selectFlag:false
            },
            modifyTime:{
               columnName:'最后修改时间',
               selectFlag:false
            },
            modifyUser:{
              columnName:'最后修改人',
               selectFlag:false
            },
            status:{
               columnName:'状态',
               selectFlag:false
            },
            relativeGroup:{
               columnName:'相关团队',
               selectFlag:true
            },
            introducer:{
               columnName:'介绍人',
               selectFlag:true
            },
            lockStatus:{
               columnName:'锁定状态',
               selectFlag:false
            },
            bussinessCard:{
              columnName:'名片',
              selectFlag:false
            }
        },
        showCheckbox: true,  // table中是否有CheckBox列
        tableLoadingFlag:false, // 表格加载中、
        tableColumnSelectFlag:false,  // 设置列是否显示 true：显示
        selectLen:0,      // 选中个数
        pageNum:1, // 初始当前页码
        pageSize:10,  // 初始每页条数
        r:-900, // 详情页面定位
        selectItem:{}, // 当前点击table行
      scene: [ // 场景选项
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '我负责的客户'
        },
        {
          value: '2',
          label: '我联合跟进定位客户'
        },
        {
          value: '3',
          label: '我下属负责的客户'
        },
        {
          value: '4',
          label: '我下属联合跟进的客户'
        },
        {
          value: '5',
          label: '我服务的客户'
        }
      ],
      sceneValue: '1',  // 场景选中项
      selectedClientList:[] // 选中的数据
      }
  },
  watch:{
    LinkmanTotalList:{
      deep:true,
      handler(){
         if(this.LinkmanTotalList.length){
           this.LinkmanList = this.LinkmanTotalList.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
         }
      }
    }
  },
  mounted () {
    this.$store.dispatch('getLinkmanList')
  },
  computed:{
    w:{
      get(){
         return document.documentElement.clientWidth - 200
      },
      set(value){

      }
    },
    layoutHeight:{
      get(){
        return this.$store.state.layoutHeight
      },
      set(){

      }
    },
    checkFlag:{
      get(){
        return this.$store.state.checkFlag
      },
      set(value){
         this.$store.commit('setCheckFlag',value)
      }
    },
    // table高度
    mainListHeight:{
      get(){
        return this.$store.state.layoutHeight - 170
      },
      set(value){
          this.$store.commit('setLayoutHeight',value)
      }
    },
    listHead:{ //设置表头
      get(){
        return this.setTableHead()
      },
      set(value){
      }
    },
    linkmanTotalList:{
      get(){
        return this.$store.state.linkmanList
      },
      set(){

      }
    },
    linkmanList:{
      get(){
         if(this.linkmanTotalList.length){
           return this.linkmanTotalList.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
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
      if (this.showCheckbox) {
        columns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
      if (this.showIndex) {
        columns.push({
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        })
      }
      if(this.tableColumns.linmanName.selectFlag){                  
        columns.push({
          width: 150,
          title: '客户名称',
          key: 'linmanName',
          sortable: true
        }) 
      }
      if(this.tableColumns.linkmanCompanyName.selectFlag){                  
        columns.push({
          width: 150,
          title: '客户公司',
          key: 'linkmanCompanyName',
          sortable: true
        }) 
      }
      if(this.tableColumns.linkmanBranch.selectFlag){                  
        columns.push({
          width: 150,
          title: '部门',
          key: 'linkmanBranch',
          sortable: true
        }) 
      }
      if(this.tableColumns.linkmanDuty.selectFlag){                  
        columns.push({
          width: 150,
          title: '职务',
          key: 'linkmanDuty',
          sortable: true
        }) 
      }
      if(this.tableColumns.linkmanMobilePhoneNum.selectFlag){                  
        columns.push({
          width: 150,
          title: '手机',
          key: 'linkmanMobilePhoneNum',
          sortable: true
        }) 
      }
       if(this.tableColumns.linkmanPhoneNum.selectFlag){                  
        columns.push({
          width: 150,
          title: '电话',
          key: 'linkmanPhoneNum',
          sortable: true
        }) 
      }
      if(this.tableColumns.linkmanEmail.selectFlag){                  
        columns.push({
          width: 150,
          title: '邮件',
          key: 'linkmanEmail',
          sortable: true
        }) 
      }
      if(this.tableColumns.policyMaker.selectFlag){                  
        columns.push({
          width: 150,
          title: '关键决策人',
          key: 'policyMaker',
          sortable: true
        }) 
      }
      if(this.tableColumns.linkmanSex.selectFlag){                  
        columns.push({
          width: 150,
          title: '性别',
          key: 'linkmanSex',
          sortable: true
        }) 
      }
      if(this.tableColumns.principal.selectFlag){
        columns.push({
          width: 120,
          title: '负责人',
          key: 'principal',
          sortable: true,
          ellipsis: true
        })  
      }
      if(this.tableColumns.principalBranch.selectFlag){
        columns.push({
          width: 150,
          title: '负责人所在部门',
          key: 'principalBranch',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.linkmanBirth.selectFlag){
        columns.push({
          width: 120,
          title: '生日',
          key: 'linkmanBirth',
          sortable: true
        })
      }
      if(this.tableColumns.linkmanAddress.selectFlag){
        columns.push({
          width: 120,
          title: '地址',
          key: 'linkmanAddress',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.commit.selectFlag){
        columns.push({
          width: 200,
          title: '备注',
          key: 'commit',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.createUser.selectFlag){
        columns.push({
          width: 120,
          title: '创建人',
          sortable: true,
          key: 'createUser',
          ellipsis: true
        })
      }
      if(this.tableColumns.createTime.selectFlag){      
        columns.push({
          width: 120,
          title: '创建时间',
          key: 'createTime',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.modifyTime.selectFlag){            
        columns.push({
          width: 120,
          title: '最后修改时间',
          key: 'modifyTime',
          sortable: true
        })
      }
      if(this.tableColumns.modifyUser.selectFlag){            
        columns.push({
          width: 120,
          title: '最后修改人',
          key: 'modifyUser',
          sortable: true
        })
      }
      if(this.tableColumns.status.selectFlag){            
        columns.push({
          width: 120,
          title: '状态',
          key: 'status',
          sortable: true
        })
      }
      if(this.tableColumns.relativeGroup.selectFlag){ 
        columns.push({
          width: 120,
          title: '相关团队',
          key: 'relativeGroup',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.introducer.selectFlag){ 
        columns.push({
          width: 120,
          title: '介绍人',
          key: 'introducer',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.lockStatus.selectFlag){       
        columns.push({
          width: 120,
          title: '锁定状态',
          key: 'lockStatus',
          sortable: true,
          ellipsis: true
        })
      }
      if(this.tableColumns.bussinessCard.selectFlag){
        columns.push({
          width: 120,
          title: '名片',
          key: 'bussinessCard',
          render: (h,params) => {
            
          }
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
    // 锁定
    lockFlag (){
       this.$store.commit('setLockFlag',true)
    },
    // 解锁
    unlockFlag (){
      this.$store.commit('setUnlockFlag',true)
    },
    // 添加相关团队成员
    addGroupMemberFlag(){
      this.$store.commit('setAddGroupMemberFlag',true)
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
    tableControl(name){
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
