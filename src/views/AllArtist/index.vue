<template>
  <div class="g-bd2 f-cb">
    <div class="g-sd2">
      <Aside />
    </div>
    <div class="g-mn2c">
      <router-view />
    </div>
  </div>
</template>

<script>
import Aside from './Aside'
export default {
  components: {
    Aside
  }
}
</script>

<style lang="less" scoped>
.f-cb::after {
  display: block;
  content: '.';
  height: 0;
  visibility: hidden;
  clear: both;
}
.g-bd2 {
  box-sizing: content-box;
  min-height: 700px;
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background: url(./images/wrap2.png) repeat-y center 0;
  .g-sd2 {
    position: relative;
    float: left;
    width: 180px;
  }
}
.g-mn2c {
  margin-left: 181px;
}
</style>