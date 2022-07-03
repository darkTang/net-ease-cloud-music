<template>
  <div>
    <div class="g-mn">
      <div class="g-mn1">
        <Content />
      </div>
      <!-- 右侧侧边栏 -->
      <div class="g-sd1">
        <Aside />
      </div>
    </div>
  </div>
</template>

<script>
import Content from './Content'
import Aside from './Aside'
export default {
  components: {
    Content,
    Aside
  },
}
</script>
<style lang="less" scoped>
.g-mn {
  display: flex;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .g-mn1 {
    flex: 1;
    padding: 47px 20px 40px 39px;
    border-right: 1px solid #ccc;
  }
  .g-sd1 {
    position: relative;
    width: 270px;
  }
}
</style>