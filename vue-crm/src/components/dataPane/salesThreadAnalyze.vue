<template>
  <div class="echartPane" :style="{height:echartPaneHeight+'px'}">
     <Card class="echartPaneItem">
        <div class="paneContent" ref="threadChangeProcess">

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
        var myChart = echarts.init(this.$refs.threadChangeProcess)
        // 绘制图表
        myChart.setOption( {
            title: {
                text: '线索转化过程分析',
                left: 'left'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left: 'center',
                top: '8%',               
                data: ['线索数', '转客户的线索数','转联系人的线索数','转换的客户数','转换的联系人数']
            },
            xAxis: {
                splitLine: {show: true},
                data: ['电话', '广告', '会议', '客户介绍', '其他', '搜索引擎', '网站']
            },
            grid: {
                left: '1%',
                top: '20%',
                containLabel: true
            },
            yAxis: {
                type: 'log',
            },
            series: [
                {
                    name: '线索数',
                    type: 'line',
                    data: [1, 3, 9, 27, 81, 247, 741]
                },
                {
                    name: '广告',
                    type: 'line',
                    data: [1, 2, 4, 8, 16, 32, 64]
                },
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
