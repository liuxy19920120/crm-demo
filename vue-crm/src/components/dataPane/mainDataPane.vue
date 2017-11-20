<template>
  <div class="clientContent" :style="{width:layoutWidth+'px'}">
      <Row>
        <Col span="24">
            <div class="crm-tit">
                <h2 class="dt-tit">
                数据看板
                </h2>
            </div>
        </Col>
       </Row>
        <Row>
        <Col span="24">
            <div class="dataPane" @click="changePane">
                <router-link v-for="(item,index) in dataPane" 
                    :to="{name:item.itemHref}" 
                    :key="index"
                    :data-index="item.index" 
                    :class="{dataPaneItem:true,active:activeIndex == item.index}">
                    {{item.name}}
                </router-link>
            </div>
        </Col>
       </Row>
       <Row>
           <router-view></router-view>
       </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataPane:[
          {
              name:'销售线索分析',
              itemHref:'salesThreadAnalyze_index',
              index:1
          },
          {
              name:'客户分析',
              itemHref:'clientAnalyze_index',
              index:2
          }
      ],
      activeIndex:1

    }
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
    }
  },
  methods:{
      // 切换显示面板
      changePane(ev){
        let target = ev.target
        let index = target.dataset.index
        this.activeIndex = index
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
  .dataPane{
    border: 1px solid #d8dde8;
    border-left: 0px;
    border-right: 0px;
    background-color: #fff;
    height: 56px;
    box-sizing: border-box;
  }
  .dataPane .dataPaneItem{
    display: inline-block;
    height: 54px;
    line-height: 54px;
    padding: 0 16px;
    margin-right: 10px;
    box-sizing: border-box;
  }
  .dataPane .dataPaneItem.active{
    border-bottom: 1px solid #3e84e9;
  }
</style>
