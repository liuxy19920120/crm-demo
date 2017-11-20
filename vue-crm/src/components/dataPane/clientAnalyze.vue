<template>
  <div class="echartPane" :style="{height:echartPaneHeight+'px'}">
     <Card class="echartPaneItem">
        <div class="paneContent" ref="customerClient">

        </div>
        <div class="threadWrap">查看详情</div>
    </Card>
     <Card class="echartPaneItem">
        <div class="paneContent" ref="echartPaneItem">

        </div>
        <div class="threadWrap">查看详情</div>
    </Card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    components:[
        echarts
    ],
    mounted () {
        // 基于准备好的dom，初始化echarts实例
        var customerClient = echarts.init(this.$refs.customerClient)
        // 绘制图表
        customerClient.setOption( {
        color: ['#3398DB'],
        title: {
            text: '员工客户情况统计',
            left: 'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend:{
            left: 'center',
            top: '8%',  
            data:[{name:'客户数',icon:'roundRect'},{name:'联系人数',icon:'roundRect'}]
        },
        grid: {
            top:'20%',
            left: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['客户数', '联系人数'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type: 'bar',
                name:'线索名称',
                data:[
                    {value:5,name: '客户数'},
                    {value:2, name: '联系人数'}
                ],
            }
        ]
        })
    },
    computed:{
        layoutHeight:{ // 容器高度
            get(){
                return this.$store.state.layoutHeight
            },
            set(){

            }
        },
        echartPaneHeight:{
            get(){
                return this.layoutHeight - 116
            },
            set(value){

            }
        }
    }

}
</script>

<style>
.echartPane{
    padding: 20px;
    background: #eee;
    display: flex;
    justify-content:space-between;
}
.echartPaneItem{
    width: 502px;
    height: 328px;
    background: #fff;
    position: relative;
}
.paneContent{
    width: 502px;
    height: 328px;
}
.echartPaneItem:hover .threadWrap{
    display: block;
}
.threadWrap{
    display: none;
    cursor: pointer;
    width: 502px;
    height: 328px;
    position: absolute;
    text-align: center;
    line-height: 328px;
    color:#fff;
    font-weight: bold;
    left: 0px;
    top:0px;
    background: rgba(88,94,107,.4)
}
</style>
