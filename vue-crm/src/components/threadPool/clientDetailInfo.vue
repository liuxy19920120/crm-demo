<template>
  <Row>
      <Col span="24">
        <div class="Tabtitle">
            <h3>详细信息</h3>
        </div>
      </Col>
      <Col span="24" class="tabInfo">
        <Collapse value="1">
            <Panel name="1">
                基本信息
                <p slot="content" class="clearfix">
                    <ul class="clearfix">
                        <li>
                            <div>
                                <span class="tit">客户姓名</span>
                               <i class="con">{{selectItem.clientName}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">客户类型</span>
                               <i class="con">{{selectItem.clientType}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">来源</span>
                               <i class="con">{{selectItem.clinetFrom}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">1级行业</span>
                               <i class="con">{{selectItem.businessLevel1}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">2级行业</span>
                               <i class="con">{{selectItem.businessLevel2}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">电话</span>
                               <i class="con">{{selectItem.phoneNum}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">传真</span>
                               <i class="con">{{selectItem.fax}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">邮件</span>
                               <i class="con">{{selectItem.email}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">网址</span>
                               <a class="con url" :href="selectItem.url">{{selectItem.url}}</a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">备注</span>
                               <i class="con">{{selectItem.comment}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">客户状态</span>
                               <i class="con">{{selectItem.clientStatus}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">锁定状态</span>
                               <i class="con">{{selectItem.lockStatus}}</i>
                            </div>
                        </li>
                    </ul>
                </p>
            </Panel>
            <Panel name="2">
                 地区定位
                <p slot="content">
                     <ul class="clearfix">
                        <li>
                            <div>
                                <span class="tit">定位</span>
                               <a class="con url" :href="'/dist/mapExpand?location='+encodeURIComponent(selectItem.locationInfo)" target="_blank">{{selectItem.locationInfo}}</a>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">国家</span>
                               <i class="con">{{selectItem.country}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">省</span>
                               <i class="con">{{selectItem.province}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">市</span>
                               <i class="con">{{selectItem.city}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">区</span>
                               <i class="con">{{selectItem.area}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">详细地址</span>
                               <i class="con">{{selectItem.address}}</i>
                            </div>
                        </li>
                    </ul>
                </p>
            </Panel>
            <Panel name="3">
                系统信息
                <p slot="content">
                    <ul class="clearfix">
                        <li>
                            <div>
                                <span class="tit">转手次数</span>
                               <i class="con">{{selectItem.moveNum}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">客户资料完善度</span>
                               <i class="con">90%</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">负责人所在部门</span>
                               <i class="con">{{selectItem.dutyOfficerSection}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">创建时间</span>
                               <i class="con">{{selectItem.createTime}}</i>
                            </div>
                        </li>
                         <li>
                            <div>
                                <span class="tit">最后修改时间</span>
                               <i class="con">{{selectItem.modifyTime}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">创建人</span>
                               <i class="con">{{selectItem.createUser}}</i>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="tit">最后修改人</span>
                               <i class="con">{{selectItem.createUser}}</i>
                            </div>
                        </li>
                    </ul>
                </p>
            </Panel>
        </Collapse>
      </Col>
  </Row>
</template>

<script>
export default {
  props:['selectItem']
}
</script>

<style>
  .Tabtitle{
      height: 52px;
      padding-top: 18px;
      box-sizing: border-box;
      padding-left: 16px;
  }
  .Tabtitle h3{
      line-height: 16px;
      padding-left: 8px;
      border-left:3px solid #12d4d7;
  }
  .tabInfo{
      padding-left: 16px;
  }
  .tabInfo .ivu-collapse{
      background: #fff;
      border: 0
  }
   .tabInfo .ivu-collapse>.ivu-collapse-item{
       border: 0;
   }
   .tabInfo ul li{
    width: 50%;
    float: left;
   }
   .tabInfo ul li div{
    margin-right: 10px;
    border-bottom: 1px solid #f2f2f2;
    padding-top: 14px;
    padding-bottom: 4px;
   }
   .tabInfo ul li .tit{
       color: #92a3b7;
       width: 130px;
       word-break: break-all;
       line-height: 24px;
       float: left;
   }
   .tabInfo ul li .con{
        line-height: 24px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #444;
   }
   .tabInfo ul a.url{
       color:#57a3f3;
   }
   .tabInfo ul a.url:hover{
       text-decoration: underline;
   }
   .tabInfo .ivu-collapse-content>.ivu-collapse-content-box{
       padding-top: 0px;
   }
   .tabInfo .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
       padding-left: 16px;
   }
</style>
