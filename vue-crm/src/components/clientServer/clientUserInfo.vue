<template>
  <Row id="clientInfo">
        <div id="infoHead">
            <div class="fl clearfix">
                <span class="accountobj fl"></span>
                <div class="fl">
                    <span class="infoHeadTitle">客户</span>
                    <p class="infoHeadUserName" :title="selectItem.clientName">
                       <span style="margin-right:10px;">{{selectItem.clientName}}</span>
                       <span @click="showMap">
                           <Icon type="map" size="20" style="margin-right:5px;" title="地图" color="#34c2ba"></Icon>
                       </span>
                       <Tooltip :content="selectItem.lockStatus" placement="bottom">
                           <Icon type="ios-locked" size="20" color="#666" v-show="selectItem.lockStatus ==='已锁定'"></Icon>
                            <Icon type="ios-unlocked" size="20" color="#666" v-show="selectItem.lockStatus ==='未锁定'"></Icon>
                        </Tooltip>
                    </p>
                </div>
            </div>  
            <div class="fr clearfix" style="position:relative">
                <Dropdown trigger="click" placement="bottom-end" style="margin-right:50px;">
                    <Button type="default">
                        更多
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>复制</DropdownItem>
                        <DropdownItem>解锁</DropdownItem>
                        <DropdownItem  divided>转发</DropdownItem>
                        <DropdownItem>日程</DropdownItem>
                        <DropdownItem>打印</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div  class="closeRound" @click="closeInfo" title="关闭">
                    <Icon type="close-round" size="20"></Icon>
                </div>
                
            </div>
        </div>
       <Col span="24">
         <ul class="mainInfo">
             <li>
                 <span class="title">客户编号</span>
                 <div>{{selectItem.clientId}}</div>
             </li>
             <li>
                 <span class="title">客户级别</span>
                 <div>{{selectItem.clientLevel}}</div>
             </li>
             <li>
                 <span class="title">负责人</span>
                 <div>{{selectItem.dutyOfficer}}</div>
             </li>
         </ul>
      </Col>
       <Col span="24">
        <Tabs id="infoTabs">
            <TabPane label="摘要" name="digest">标签一的内容</TabPane>
            <TabPane label="详细信息" name="detailedInformation">
                <client-detail-info :selectItem="selectItem"></client-detail-info>
            </TabPane>
            <TabPane label="相关团队" name="relationGroup">标签三的内容</TabPane>
            <TabPane label="财务信息" name="financeInfo">标签三的内容</TabPane>
            <TabPane label="地址管理" name="addressInfo">标签三的内容</TabPane>
            <TabPane label="邮件" name="emailInfo">标签三的内容</TabPane>
            <TabPane label="联系人" name="liaisonsInfo">标签三的内容</TabPane>
            <TabPane label="销售线索" name="saleThread">标签三的内容</TabPane>
            <TabPane label="附件" name="accessory">标签三的内容</TabPane>
            <TabPane label="审批流程" name="examine">标签三的内容</TabPane>
            <TabPane label="费用" name="charge">标签三的内容</TabPane>
            <TabPane label="更多" name="more">标签三的内容</TabPane>
        </Tabs>
      </Col>
  </Row>
</template>

<script>
import ClientDetailInfo from '@/components/clientServer/clientDetailInfo'
export default {
    props:['selectItem'],
  components:{
     ClientDetailInfo 
  },
  methods:{
      closeInfo () {
        this.$emit('rightChange',-900)
      },
      showMap(){
        window.open('http://localhost:8001/mapExpand?location='+encodeURIComponent(this.selectItem.locationInfo),'_blank')

      }
  }
}
</script>

<style>
  #clientInfo{
      width: 900px;
      overflow:auto;
      height: 100%;
      position: relative;
      transition: 1s linear;
  }
  #infoHead{
      width: 100%;
      height: 70px;
      background: #f4f6f9;
      padding: 13px 0 14px 12px;
  }
  #infoHead .accountobj{
      display: inline-block;
      height: 32px;
      width: 32px;
      background: url('../../assets/images/d-obj-icon@2x-f2dc4a5396.png') no-repeat;
      margin-right: 10px;
  }
  #infoHead .infoHeadTitle{
      font-size: 12px;
  }
  #infoHead .infoHeadUserName{
      line-height: 22px;
      font-size: 16px;
      color:#333;
  }
  .closeRound{
      position: absolute;
      top:0px;
      right:10px;
  }
  #clientInfo .mainInfo{
    display: flex;
    padding: 10px 0 10px 15px;
    background: #f4f6f9;
  }
  #clientInfo .mainInfo li{
      flex: 1;
  }
  #clientInfo .mainInfo li span{
      font-size: 12px;
  }
  #clientInfo .mainInfo li div{
    line-height: 18px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 5px;
  }
  #infoTabs .ivu-tabs-bar .ivu-tabs-nav-container {
     font-size: 12px;
     background-color: #f0f4f9;
     color: #92a3b7;
  }
</style> 