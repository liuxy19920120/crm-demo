<template>
  <div ref="mapExpand" id="mapExpand"></div>
</template>

<script>
export default {
  mounted () {
      this.$refs.mapExpand.style.height = document.documentElement.clientHeight + 'px'
      let search = window.location.search
      if(search){
          search = search.slice(1).split('=')[1]
      }else{
          search = '北京市'
      }
      var map = new BMap.Map('mapExpand')
        var point = new BMap.Point(116.331398, 39.897445)
        map.centerAndZoom(point, 12)
        var myGeo = new BMap.Geocoder()
        myGeo.getPoint(decodeURIComponent(search), function (point) {
          if (point) {
            map.centerAndZoom(point, 16)
            var maker = new BMap.Marker(point)
            map.addOverlay(maker)
            var opts = {
              width : 200,     // 信息窗口宽度
              title : "地址：" , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
              message:"这是地址~"
            }
            var infoWindow = new BMap.InfoWindow(decodeURIComponent(search), opts);  // 创建信息窗口对象 
            maker.addEventListener("click", function(){          
              map.openInfoWindow(infoWindow,point) //开启信息窗口
            })
          } else {
            alert('您选择地址没有解析到结果!')
          }
        }, '北京市')
    map.enableScrollWheelZoom(true)
  }
}
</script>

<style>

</style>
