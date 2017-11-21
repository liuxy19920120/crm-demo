<template>
    <div class="clientContent" :style="{width:layoutWidth+'px'}">
       <Row>
        <Col span="24">
            <div class="crm-tit">
                <h2 class="dt-tit">
                CRM信息
                </h2>
            </div>
        </Col>
       </Row>
       <Row>
        <Col span="24">
            <ul class="batch-trem clearfix">
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
                 <li style="margin-left:10px">
                    <Button type="dashed" icon="gear-b">场景管理</Button>
                </li>
                <li class="noborder" style="margin-left:10px">
                    <Button type="dashed" icon="funnel">高级筛选</Button>
                </li>
            </ul>
        </Col>
       </Row>
       <Row>
        <Col class="clearfix" span="24">
            <Col span="24">
                <div ref="mainList" id="mainList" :style="{height:mainListHeight +'px'}">
                </div>                   
            </Col>                
        </Col>
       </Row>
        <Row class="clientInfoMain" :style="{right:r+'px'}">
            <crm-user-info @rightChange="rightChange" :selectItem="selectItem"></crm-user-info>
        </Row>
   </div>  
</template>

<script>
import CrmUserInfo from '@/components/crmInfo/crmUserInfo'
import {deepClone} from '../../deepClone.js'
export default {
  components:{
      CrmUserInfo
  },
  data () {
      return {
        selectItem:{}, // 当前点击信息
        r:-900, // 详情页面定位
        scene: [ // 场景选项
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '我负责客户的CRM信息'
          },
          {
            value: '2',
            label: '我负责联系人的CRM信息'
          },
          {
            value: '3',
            label: '我下属负责相关业务的CRM信息'
          }
        ],
        sceneValue: '1',  // 场景选中项
        selectedClientList:[] // 选中的数据
      }
  },
  watch:{
    // 监控客户列表信息变化，主要是解决从后台取数据需要一定的时间，一开始渲染画面的列表为空
    crmInfoTotalList:{
      deep:true,
      handler(){
         if(this.crmInfoTotalList.length){
           this.crmInfoList = this.crmInfoTotalList.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
         }
      }
    }
  },
  mounted () {
    this.$store.dispatch('getCrmInfoList')
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
    mainListHeight:{ // table高度
      get(){
        return this.layoutHeight - 170
      },
      set(value){
      }
    },
    crmInfoTotalList:{ // 所有客户列表信息
      get(){
        return this.$store.state.crmInfoList
      },
      set(){
      }
    },
    crmInfoList:{  // 本页显示信息
      get(){
         if(this.crmInfoTotalList.length){
           return this.crmInfoTotalList.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
         }else{
           return []
         }
      },
      set(value){

      }
    }
  },
  methods:{
    // 翻页
    pageTurn (num) {
      this.pageNum = num
      this.$store.commit('setCheckFlag',true)
      this.$store.commit('setSelectedDataList',[])
    },
    // 详细信息位置
    rightChange (r){
       this.r = r
    },
    // 详细信息显示
    showInfo(item,index){
      this.r = 0
      this.selectItem = item
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
