<template>
  <div class='crm-aside'>
    <Tabs>
        <TabPane icon="android-desktop">
            <div class="createBtn">
                <router-link to="/test"  icon="plus" class="ivu-btn ivu-btn-primary" exact tag="button">
                    快速新建
                </router-link>
                <!-- <div class="createGroup">
                    <a>
                        <span class="c"></span>
                        销售记录
                    </a>
                     <a>
                        <span class="c"></span>
                        客户
                    </a>
                     <a>
                        <span class="c"></span>
                        联系人
                    </a>
                     <a>
                        <span class="c"></span>
                        销售线索
                    </a>    
                </div> -->
            </div>
            <ul class="pane-list">
                <li v-for="(item,index) in tabList01" :key="index" @click="changeItemIndex('01',index)">
                     <router-link :to="{name:item.itemHref}" :class="{active:tabIndex === '01-'+index}">
                        <Icon :type="item.itemType"></Icon>
                        <span class="text">{{item.itemName}}</span>
                     </router-link>
                </li>
            </ul>  
        </TabPane>
        <TabPane icon="ios-pulse">
             <ul class="pane-list">
                <li v-for="(item,index) in tabList02" :key="index" @click="changeItemIndex('02',index)">
                     <router-link :to="{name:item.itemHref}" :class="{active:tabIndex === '02-'+index}">
                        <Icon :type="item.itemType"></Icon>
                        <span class="text">{{item.itemName}}</span>
                     </router-link>
                </li>
            </ul>  
        </TabPane>
        <TabPane icon="android-notifications">标签三的内容</TabPane>
        <TabPane icon="gear-b">标签四的内容</TabPane>
    </Tabs>
    <p class="theme-set">
    <span class="fold-btn">
        <Icon type="navicon-round"></Icon>
    </span>
    </p> 
</div>
</template>

<script>
export default {
  data () {
    return {
        tabList01:[
            {
               itemName:'CRM信息',
               itemType:'information-circled',
               itemHref:'CRMShow'
            },
            {
               itemName:'销售线索',
               itemType:'ios-pricetag-outline',
               itemHref:'SaleShow'
            },
            {
               itemName:'线索池',
               itemType:'soup-can-outline',
               itemHref:'threadShow'
            },
            {
               itemName:'客户',
               itemType:'person',
               itemHref:'clientShow_index'
            },
            {
               itemName:'联系人',
               itemType:'person-stalker',
               itemHref:'linkmanShow_index'
            }
        ],
        tabList02:[
            {
               itemName:'数据看板',
               itemType:'ios-pie',
               itemHref:'salesThreadAnalyze_index'
            }
        ],
        tabIndex:'01-3',
    }
  },
  methods:{
      changeItemIndex (tab,index){
         this.tabIndex = tab+'-'+index
      }
  }
}
</script>

<style>
 .crm-aside{
      width: 200px;
      background: #2d3037;
      height: 100%;
      position: relative;
      
  }
  .crm-aside .ivu-tabs-nav .ivu-tabs-tab{
      text-align: center;
      padding: 10px 4px 10px 8px;
  }

  .crm-aside ::before{
      font-size: 20px;
  }
  
  .createBtn{
      position: relative;
      text-align: center;
      margin-bottom: 10px;
  }
  .createBtn:hover .createGroup{
     display:block;
  }
  .createBtn .ivu-btn{
      width: 180px;
      font-size: 14px;
  }
  .createBtn .createGroup{
    display: block;
    position: absolute;
    top:0px;
    left:100px;
    width: 320px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 12px rgba(0,0,0, 0.2);
    z-index:1000;
  }
  .createBtn .createGroup a{
      width: 60px;
      float: left;
      margin: 10px;
      text-align: center;
      color:#666;
  }
  .createBtn .createGroup .c{
      display: block;
      width: 40px;
      height: 40px;
      margin: 0 auto 10px;
      border-radius: 50%;
      overflow: hidden;
  }
  .createBtn .createGroup span:nth-child(1){
      background: url('../assets/images/d-obj-icon.png') 
  }

  .pane-list{
      overflow: auto;
  }
  .pane-list a{
    font-size: 14px;
    color: #c4cdd5;
    display: block;
    padding: 10px 10px 10px 30px;
    min-height: 20px;
    word-wrap: break-word;
    line-height: 20px;
    color: #c4cdd5;
    text-decoration: none;
    position: riative;
  }
  .pane-list a:hover{
      color: #fff;
      background: #454e57;
  }
  .pane-list a.active{
      color: #fff;
      background: #454e57;
  }

  .pane-list ::before{
      font-size: 16px;
  }

  .pane-list .ivu-icon{
      margin-right: 5px;
  }
  .crm-aside .theme-set{
    width: 100%; 
    height: 40px;
    background-color: #22262a;
    position: absolute;
    bottom: 0;
   }
   .crm-aside .fold-btn{
    width: 40px;
    height: 40px;
    color: #d3dbe2;
    cursor: pointer;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
   }
   .crm-aside .fold-btn i{
    display: block;
    width: 20px;
    height: 20px;
    margin: 10px auto 0;
   }
</style>
