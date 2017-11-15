<template>
  <div id="locationMap"></div>
</template>

<script>
// import {Mp} from '../map.js'
export default {
  mounted () {
    /* eslint-disable no-undef */
    // Mp('c90E2TMXMfChLr1vFCHjA8vqNtZNB5aI').then((BMap) => {
      /* eslint-disable no-undef */
      var map = new BMap.Map('locationMap')
      this.$store.state.map = map
      var point = new BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 12)
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point)
          map.addOverlay(mk)
          map.panTo(r.point)
        } else {
          alert('failed' + this.getStatus())
        }
      }, {enableHighAccuracy: true})
    // })
  }
}
</script>

<style>

</style>
