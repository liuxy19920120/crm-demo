<template>
   <Modal
        title="对话框标题"
        v-model="flag"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :ok-text="okText"
        :cancel-text="cancelText"
        @on-ok="ensureHandel"
        @on-cancel="cancelHandel">
         <p slot="header">
            <slot name="header"></slot>
        </p>
        <slot name="content">
        </slot>
    </Modal>
</template>

<script>
export default {
   props:{
    showFlag:{
     type:Boolean
    },
    type:{
      type:String
    },
    okText:{
      type:String,
      default:'确定'
    },
    cancelText:{
      type:String,
      default:'取消'
    }
   },
   computed: {
    flag:{
        get() {
          return this.showFlag
        },
        set(value){
        }
    } 
  },
  methods:{
      ensureHandel() {
        this.$emit('showFlagChange',{
            flag:false,
            value:this.type,
            sign:'ok'
        })
      },
      cancelHandel() {
        this.$emit('showFlagChange',{
            flag:false,
            value:this.type,
            sign:'cancel'
        })

      }
  }
}
</script>

<style>
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
}
.ivu-modal{
    top: 0;
}
</style>
