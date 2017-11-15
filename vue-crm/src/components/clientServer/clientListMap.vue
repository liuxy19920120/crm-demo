<template>
  <ul class="listMapChild" ref="listMapChild" :style="{height:h+'px'}">
       <li v-for="(item,index) in clientList" :key="item.clientId">
        <div class="clearfix">
            <span class="fl index">{{index+1}}</span>
            <div class="fl info">
                <p class="clientName">
                    <a href="javascript:void(0)">{{item.clientName}}</a>
                </p>
                <p>负责人：刘小玉</p>
                <p>客户定位：{{item.locationInfo}}</p>
            </div>
        </div>
        <a href="javascript:void(0)">选择定位</a>
    </li>
  </ul>
</template>

<script>
export default {
    props:['clientList','h'],
}
</script>

<style scoped>
   .listMapChild{
       overflow: auto;
       width: 300px;
   }
   .listMapChild li{
       position: relative;
       background: #fff;
       padding: 10px;
       border-bottom: 1px solid #eee
   }
   .listMapChild li:hover{
       background: #eee
   }
   .listMapChild li:active{
        background: #eee
   }
   .listMapChild li .index{
       background: url(../../assets/images/oval-200060df4c.png) no-repeat;
       width:16px;
       height: 25px;
       text-align: center;
       line-height: 16px;
       font-size: 12px;
       color:#fff

   }
  .listMapChild li> a{
      position: absolute;
      right: 10px;
      bottom: 17px;
      background: #eee;
      color: #2d8cf0;
      display: none;
  }
  .listMapChild li:hover>a{
      display: block;
  }
  .listMapChild li .info{
      margin-left: 10px;
  }
  .listMapChild li p{
     width:200px;
     line-height: 26px;
     color: #999;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
  }
  .listMapChild li p.clientName{
      color:#2d8cf0;
  }
  .listMapChild li>a:hover{
    text-decoration:underline;
  }
</style>
