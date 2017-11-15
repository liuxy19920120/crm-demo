<template>
  <div class="tableColumnSelect" v-show="tableColumnSelectFlag">
      <ul class="tableColumn">
        <li v-for="(item,id) in tableColumnShow" :key="id">
            <Checkbox v-model="item.selectFlag">{{item.columnName}}</Checkbox>
        </li>
      </ul>
      <p class="btn_tableColumn">
        <Button type="primary" class="btn_tableColumn_confirm" @click="tableHeadChange">确定</Button>
      </p>    
  </div>
</template>

<script>
import {deepClone} from '../deepClone.js'
export default {
  props:['selectFlag','tableColumns'],
  computed:{
    tableColumnSelectFlag:{
      get(){
        return this.selectFlag
      },
      set(value){
        this.selectFlag = value
      }
    },
    tableColumnShow:{
      get(){
        return deepClone(this.tableColumns)
      },
      set(value){
        this.tableColumns = deepClone(value)
      }
    }
  },
  methods:{
    tableHeadChange () {
      this.$emit('tableHeadChange', this.tableColumnShow, false)
    }
  }
}
</script>

<style scoped>
.tableColumnSelect{
    width: 200px;
    background: #f7f7f7;
    position:absolute;
    right:20px;
    top:38px;
    z-index:10;
    padding:10px 0;
    box-shadow: inset 1px 0 0 0 #f0f0f0;
    border-radius: 4px;
}
.tableColumnSelect .tableColumn{
    text-align: left;
    height: 200px;
    overflow: auto;
}
.tableColumnSelect .tableColumn li{
    line-height: 30px;
    height: 30px;
    padding-left: 10px;
}
.tableColumnSelect .tableColumn li:hover{
  background: #f4f6f9;
}
.btn_tableColumn{
  height: 50px;
  border-top: 1px solid #ccc;
  text-align: center;
  padding-top:12px; 
}
.btn_tableColumn_confirm{
  width: 170px;
}
</style>
