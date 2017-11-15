<template>
</template>

<script>
export default {
  computed: {
    clientList () {
      return this.$store.state.clientList
    }
  },
  mounted () {
    console.log(this.layoutH)
    this.$refs.mainList.style.height = this.layoutH - 167 + 'px'
    // window.onresize = this.init
    this.$store.dispatch('getClientList')
  }
}
</script>

<style>
#mainList{
    overflow: auto;
}
.main-block{
    height: 32px;
    background: #f4f6f9;
    padding: 9px 15px;

  }
</style>
